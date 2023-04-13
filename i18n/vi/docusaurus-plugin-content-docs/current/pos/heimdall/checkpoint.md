---
id: checkpoint
title: Điểm kiểm duyệt
description: Chụp ảnh của tình trạng chuỗi Bor đã gửi đến Ethereum
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

# Điểm kiểm duyệt {#checkpoint}

Các điểm kiểm tra là phần quan trọng nhất của mạng Polygon. Nó đại diện cho ảnh chụp nhanh của trạng thái chuỗi Bor và được cho là được chứng thực bởi hơn ⅔ tập hợp người xác thực trước khi được xác thực và gửi trên các hợp đồng được triển khai trên Ethereum.

## Loại {#types}

Cấu trúc điểm kiểm duyệt trên trạng thái Heimdall trông như sau:

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

### Hàm băm gốc {#root-hash}

<img src={useBaseUrl("img/checkpoint/checkpoint.svg")} />

`RootHash` là hàm băm Merkle của các hàm băm khối Bor từ `StartBlock`đến`EndBlock`. Hàm băm gốc cho điểm kiểm duyệt được tạo bằng cách sau:

```matlab
blockHash = keccak256([number, time, tx hash, receipt hash])
```

Mã giả cho hàm băm gốc cho từ `1`đến `n`khối Bor:

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

Dưới đây là một số snipets của cách kiểm tra được tạo từ đầu khối Bor

Nguồn: [https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114](https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114)

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

`AccountRootHash` là hàm băm của thông tin liên quan đến tài khoản người xác thực cần được chuyển cho chuỗi Ethereum tại từng điểm kiểm duyệt.

```jsx
eachAccountHash := keccak256([validator id, withdraw fee, slash amount])
```

Mã giả cho hàm băm gốc tài khoản cho từ `1`đến `n`khối Bor:

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

Có thể tìm thấy mã Golang cho hàm băm tài khoản ở đây: [https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101](https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101)

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
