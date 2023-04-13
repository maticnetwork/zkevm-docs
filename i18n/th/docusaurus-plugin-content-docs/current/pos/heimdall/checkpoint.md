---
id: checkpoint
title: เช็คพอยต์
description: Snapshoot ของสถานะเชน Bor ที่ส่งไปยัง Ethereum
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

# เช็คพอยต์ {#checkpoint}

เช็คพอยต์เป็นส่วนสำคัญที่สุดของเครือข่าย Polygonซึ่งแสดงสแนปช็อตของสถานะเชน Bor และควรผ่านการรับรองโดย ⅔ ขึ้นไปของชุดตัวตรวจสอบความถูกต้อง ก่อนที่จะตรวจสอบความถูกต้องและส่งไปยังสัญญาที่ปรับใช้บน Ethereum

## ประเภท {#types}

โครงสร้างเช็คพอยต์บนสถานะ Heimdall มีลักษณะดังต่อไปนี้:

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

### แฮชต้นทาง {#root-hash}

<img src={useBaseUrl("img/checkpoint/checkpoint.svg")} />

`RootHash` คือแฮช Merkle ของแฮชของบล็อก Bor ตั้งแต่ `StartBlock` ถึง `EndBlock`แฮชต้นทางสำหรับเช็คพอยต์ถูกสร้างขึ้นโดยใช้วิธีต่อไปนี้:

```matlab
blockHash = keccak256([number, time, tx hash, receipt hash])
```

โค้ดเทียมสำหรับแฮชต้นทางสำหรับบล็อก Bor ตั้งแต่ `1` ถึง `n`:

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

นี่คือตัวอย่างบางส่วนเกี่ยวกับวิธีการสร้างเช็คพอยต์จากหัวบล็อกเชน Bor

ที่มา: [https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114](https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114)

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

`AccountRootHash`คือแฮชของข้อมูลเกี่ยวกับบัญชีตัวตรวจสอบความถูกต้องที่จะต้องส่งไปยังเชน Ethereum ที่แต่ละเช็คพอยต์

```jsx
eachAccountHash := keccak256([validator id, withdraw fee, slash amount])
```

โค้ดเทียมสำหรับแฮชต้นทางของบัญชีสำหรับบล็อก Bor ตั้งแต่ `1` ถึง `n`:

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

โค้ด Golang สำหรับแฮชของบัญชีอยู่ที่นี่: [https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101](https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101)

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
