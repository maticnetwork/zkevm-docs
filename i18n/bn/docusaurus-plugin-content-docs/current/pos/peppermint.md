---
id: peppermint
title: Peppermint
description: Peppermint একটি সংশোধিত Ethereum-compatible Tendermint
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint একটি সংশোধিত Tendermint। Ethereum ঠিকানার সাথে সামঞ্জস্যপূর্ণ এবং Ethereum চেইনে যাচাইযোগ্য করার জন্য এটি পরিবর্তন করা হয়।

## সংক্ষিপ্ত বিবরণ {#overview}

1. স্বাক্ষর স্কিমে পরিবর্তনগুলি
2. Ethereum স্মার্ট কন্ট্র্যাক্টে এটি যাচাইযোগ্য করতে `vote`-এ পরিবর্তনগুলি
3. `vote` এনকোডিং স্কিমে পরিবর্তনগুলি

Peppermint সলিডিটি স্মার্ট on Tendermint ভোট যাচাই করতে `secp256k1`স্বাক্ষর স্কিম ব্যবহার করে।

উত্স: [https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

এটি `Vote`-এ `Data` ফিল্ড যোগ করে এবং ব্লকে লেনদেনগুলির জন্য `hash` পেতে `Proposal` স্ট্রাক্ট করে। স্মার্ট কন্ট্র্যাক্টে, `Data` চেকপয়েন্ট ডেটা, হ্যাশ এবং যাচাইকারীর স্বাক্ষরগুলির সংখ্যাগরিষ্ঠ (⅔-+1) এর সাথে মেলে কিনা এটি তা চেক করে। ধারণাটি হল যাচাইকারী সেটের সংখ্যাগরিষ্ঠতা, কন্ট্র্যাক্টে থাকা লেনদেনে সম্মত হয় কিনা তা যাচাই করা।

`Vote` বাইট পেতে Peppermint, Amino এনকোডিং এর পরিবর্তে RLP ব্যবহার করে। এখানে ব্লকের `Txs.Hash()`জন্য `Data`আছে।

উত্স: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

```go
// [peppermint] create RLP vote to decode in contract
type CanonicalRLPVote struct {
	ChainID string
	Type    byte
	Height  uint
	Round   uint
	Data    []byte
}
```

এবং ভোটে স্বাক্ষরের জন্য বাইট ডেটা পেতে RLP এনকোডিং লিব ব্যবহার করা।

উত্স: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

```go
func (vote *Vote) SignBytes(chainID string) []byte {
	// [peppermint] converted from amino to rlp
	bz, err := rlp.EncodeToBytes(CanonicalizeVote(chainID, vote))
	if err != nil {
		panic(err)
	}
	return bz
}
```

সম্পূর্ণ উত্স: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
