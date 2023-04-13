---
id: checkpoint
title: চেকপয়েন্ট
description: Ethereum এ জমা দেওয়া Bor চেইনের রাষ্ট্রটির স্ন্যাপশট
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

# চেকপয়েন্ট {#checkpoint}

চেকপয়েন্ট হল Polygon নেটওয়ার্কের সবচেয়ে গুরুত্বপূর্ণ অংশ। এটি Bor চেইন স্টেটের স্ন্যাপশটগুলিকে প্রতিনিধিত্ব করে এবং Ethereum-এ স্থাপন করা চুক্তিতে যাচাইকরণ এবং জমা দেওয়ার আগে যাচাইকারী সেটের ২/৩+  দ্বারা সত্যায়িত হবে বলে মনে করা হয়।

## প্রকার {#types}

Heimdall স্টেটের চেকপয়েন্ট কাঠামো এরকম দেখায়:

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

### রুট হ্যাশ {#root-hash}

<img src={useBaseUrl("img/checkpoint/checkpoint.svg")} />


 `RootHash` হলো  `StartBlock` থেকে  `EndBlock`পর্যন্ত Bor ব্লক হ্যাশের
Merkle হ্যাশ। চেকপয়েন্টের জন্য রুট হ্যাশ নিম্নলিখিত উপায়ে তৈরি করা হয়েছে:

```matlab
blockHash = keccak256([number, time, tx hash, receipt hash])
```


 `1` থেকে `n`Bor ব্লকের রুট হ্যাশের জন্য সিউডোকোড:

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

এখানে Bor চেইন ব্লক হেডার থেকে কীভাবে চেকপয়েন্ট তৈরি করা is ার কিছু snippets রয়েছে।

উৎস: [https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114](https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114)

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

`AccountRootHash`হল বৈধতাকারী অ্যাকাউন্ট-সম্পর্কিত তথ্যের হ্যাশ যা প্রতিটি চেকপয়েন্টে Ethereum চেইনে প্রেরণ করতে হবে।

```jsx
eachAccountHash := keccak256([validator id, withdraw fee, slash amount])
```

  `1` থেকে `n` Bor ব্লকের অ্যাকাউন্ট রুট হ্যাশের জন্য সিউডোকোড:


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

অ্যাকাউন্ট হ্যাশের জন্য Golang
 কোড এখানে পাওয়া যেতে পারে: [https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101](https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101)

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
