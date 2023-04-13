---
id: checkpoint
title: Checkpoint
description: Snapshots do estado da chain de Bor submetidos ao Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - snapshots of bor chain
  - ethereum
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

Os pontos de verificação são a parte mais crucial da rede Polygon. Representam snapshots do estado da chain BOR e é suposto serem atestados por ⅔ do conjunto de validadores antes de serem validados e submetidos nos contratos implementados no Ethereum.

## Tipos {#types}

A estrutura checkpoint no estado Heimdall parece-se com o seguinte:

```go
type CheckpointBlockHeader struct {
	// Proposer is selected based on stake
	Proposer        types.HeimdallAddress `json:"proposer"`

	// StartBlock: The block number on Bor from which this checkpoint starts
	StartBlock      uint64                `json:"startBlock"`

	// EndBlock: The block number on Bor from which this checkpoint ends
	EndBlock        uint64                `json:"endBlock"`

	// RootHash is the Merkle root of all the leaves containing the block
	// headers starting from start to the end block
	RootHash        types.HeimdallHash    `json:"rootHash"`

	// Account root hash for each validator
  // Hash of data that needs to be passed from Heimdall to Ethereum chain like withdraw topup etc.
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`

  // Timestamp when checkpoint was created on Heimdall
	TimeStamp       uint64          `json:"timestamp"`
}
```

### hash ROOT {#root-hash}

<img src={useBaseUrl("img/checkpoint/checkpoint.svg")} />

`RootHash` é o hash Merkle dos hashes do bloco BOR de `StartBlock` para `EndBlock`. Hash ROOT para checkpoint é criado da seguinte maneira:

```matlab
blockHash = keccak256([number, time, tx hash, receipt hash])
```

Pseudocode para hash ROOT `1` a `n` blocos BOR:

```go
B(1) := keccak256([number, time, tx hash, receipt hash])
B(2) := keccak256([number, time, tx hash, receipt hash])
.
.
.
B(n) := keccak256([number, time, tx hash, receipt hash])

// checkpoint is Merkle root of all block hash
checkpoint's root hash = Merkel[B(1), B(2), ....., B(n)]
```

Aqui estão alguns fragmentos de como o checkpoint é criado a partir de cabeçalhos de blocos de chain do Bor.

Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114](https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114)

```go
// Golang representation of block data used in checkpoint
blockData := crypto.Keccak256(appendBytes32(
	blockHeader.Number.Bytes(),
	new(big.Int).SetUint64(blockHeader.Time).Bytes(),
	blockHeader.TxHash.Bytes(),
	blockHeader.ReceiptHash.Bytes(),
))

// array of block hashes of Bor blocks
headers := [blockData1, blockData2, ..., blockDataN]

// merkel tre
tree := merkle.NewTreeWithOpts(merkle.TreeOptions{EnableHashSorting: false, DisableHashLeaves: true})
tree.Generate(convert(headers), sha3.NewLegacyKeccak256())

// create checkpoint's root hash
rootHash := tree.Root().Hash
```

### AccountRootHash {#accountroothash}

`AccountRootHash` é a hash das informações relacionadas com a conta do validador que precisa de passar para a chain Ethereum a cada checkpoint.

```jsx
eachAccountHash := keccak256([validator id, withdraw fee, slash amount])
```

Pseudocode para a hash ROOT da conta para `1` a `n` blocos BOR:

```go
B(1) := keccak256([validator id, withdraw fee, slash amount])
B(2) := keccak256([validator id, withdraw fee, slash amount])
.
.
.
B(n) := keccak256([validator id, withdraw fee, slash amount])

// account root hash is Merkle root of all block hash
checkpoint's account root hash = Merkel[B(1), B(2), ....., B(n)]
```

O código Golang para a hash da conta pode ser encontrado aqui: [https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101](https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101)

```go
// DividendAccount contains Fee, Slashed amount
type DividendAccount struct {
	ID            DividendAccountID `json:"ID"`
	FeeAmount     string            `json:"feeAmount"`     // string representation of big.Int
	SlashedAmount string            `json:"slashedAmount"` // string representation of big.Int
}

// calculate hash for particular account
func (da DividendAccount) CalculateHash() ([]byte, error) {
	fee, _ := big.NewInt(0).SetString(da.FeeAmount, 10)
	slashAmount, _ := big.NewInt(0).SetString(da.SlashedAmount, 10)
	divAccountHash := crypto.Keccak256(appendBytes32(
		new(big.Int).SetUint64(uint64(da.ID)).Bytes(),
		fee.Bytes(),
		slashAmount.Bytes(),
	))

	return divAccountHash, nil
}
```
