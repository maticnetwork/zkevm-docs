---
id: checkpoint
title: चेकपॉइंट
description: Bor को पेश किया गया बोर चेन स्टेट के स्नैपशॉट
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

# चेकपॉइंट {#checkpoint}

चेकपॉइंट पॉलीगॉन नेटवर्क का सबसे महत्वपूर्ण हिस्सा हैं. यह बोर चेन स्टेट के स्नैपशॉट को दर्शाता है और वैलिडेट होने और एथेरेयम पर डिप्लॉय किए गए कॉन्ट्रैक्ट्स पर सबमिट किए जाने से पहले वैलिडेटर सेट के ⅔+ द्वारा साक्ष्यांकित करना होता है.

## प्रकार {#types}

हेम्डल स्टेट पर चेकपॉइंट स्ट्रक्चर निम्नानुसार दिखता है:

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

### रुट हैश {#root-hash}

<img src={useBaseUrl("img/checkpoint/checkpoint.svg")} />

बोर ब्लॉक हैश के`StartBlock` से `EndBlock`तक `RootHash`बोर का मर्कल हैश है. चेकपॉइंट के लिए रुट हैश को निम्नलिखित तरीके से बनाया जाता है:

```matlab
blockHash = keccak256([number, time, tx hash, receipt hash])
```

बोर ब्लॉक `1`से `n`के रुट हैश के लिए छद्म कोड:

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

यहाँ कुछ स्निपेट हैं कि कितनी चेकपॉइंट को बोर चेन ब्लॉक हेडर से बनाया जाता है.

स्रोत: [https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114](https://github.com/maticnetwork/heimdall/blob/develop/checkpoint/types/merkel.go#L60-L114)

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

### अकाउंट रूट हैश {#accountroothash}

`AccountRootHash`वैलिडेटर अकाउंट सम्बन्धी जानकारी का हैश है जिसे प्रत्येक चेकपॉइंट पर एथेरेयम चेन में पास करना पड़ता है.

```jsx
eachAccountHash := keccak256([validator id, withdraw fee, slash amount])
```

बोर ब्लॉक `1`से`n`के रुट हैश के लिए छद्म कोड:

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

अकाउंट हैश के लिए गोलंग कोड यहाँ मिल सकता है: [https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101](https://github.com/maticnetwork/heimdall/blob/develop/types/dividend-account.go#L91-L101)

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
