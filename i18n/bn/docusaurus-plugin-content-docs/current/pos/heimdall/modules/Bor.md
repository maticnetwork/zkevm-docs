---
id: bor
title: Bor
description: মডিউল যে Heimdall স্প্যান ম্যানেজমেন্ট পরিচালনা করে
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor মডিউল {#bor-module}

Bor মডিউল Heimdall-এ স্প্যান ম্যানেজমেন্ট পরিচালনা করে। প্রদত্ত Bor চেইনের বর্তমান ব্লক নম্বর `n`, বর্তমান স্প্যান `span`, যদি `span.StartBlock <= n < span.EndBlock`, কোনও যাচাইকারী দ্বারা Heimdall-এ নতুন স্প্যান প্রস্তাব করা হয়।

## মেসেজ {#messages}

### MsgProposeSpan {#msgproposespan}

`MsgProposeSpan`একটি প্রদত্ত জন্য যাচাইকারী কমিটির সেট করে `span`এবং Heimdall স্টেটে একটি নতুন স্প্যান সংরক্ষণ করে।

উত্স: [https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

```go
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
	ID         uint64                  `json:"span_id"`
	Proposer   hmTypes.HeimdallAddress `json:"proposer"`
	StartBlock uint64                  `json:"start_block"`
	EndBlock   uint64                  `json:"end_block"`
	ChainID    string                  `json:"bor_chain_id"`
}
```

এই লেনদেনটি সমস্ত যাচাইকারীদের থেকে কীভাবে প্রযোজকদের বেছে নেয় তা এখানে দেওয়া হল:

1. যাচাইকারীদের ক্ষমতার উপর ভিত্তি করে এটি একাধিক স্লট তৈরি করে। উদাহরণ: 10 ক্ষমতা থাকা A এর 10টি স্লট থাকবে, 20 ক্ষমতা থাকা B এর 20টি স্লট থাকবে।
2. সমস্ত স্লট সহ, `shuffle` ফাংশন `seed` ব্যবহার করে তাদের অদলবদল করে এবং প্রথম `producerCount` জন প্রযোজককে নির্বাচন করে।  সমস্ত যাচাইকারীদের থেকে প্রযোজকদের নির্বাচন করতে `bor` মডিউল Heimdall-এ ETH 2.0 অদলবদলের অ্যালগরিদম ব্যবহার করে। প্রতিটি স্প্যান`n`, `seed` হিসাবে Ethereum (ETH 1.0) ব্লক `n` এর ব্লক হ্যাশ ব্যবহার করে। উল্লেখ্য যে স্লট ভিত্তিক নির্বাচন, যাচাইকারীদের তাদের ক্ষমতার উপর ভিত্তি করে যাচাইকারীদের নির্বাচিত হওয়ার অনুমতি দেয়। যে যাচাইকারীর ক্ষমতা যত বেশি হবে তার নির্বাচিত হওয়ার জন্য সম্ভাবনা বেশি থাকবে। সূত্র: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

## ধরনগুলি {#types}

Heimdall-এর ব্যবহার করা স্প্যান এর বিবরণ এখানে দেওয়া হল:

```go
// Span structure
type Span struct {
	ID                uint64       `json:"span_id" yaml:"span_id"`
	StartBlock        uint64       `json:"start_block" yaml:"start_block"`
	EndBlock          uint64       `json:"end_block" yaml:"end_block"`
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## প্যারামিটার {#parameters}

Bor মডিউলটিতে নিম্নলিখিত প্যারামিটারগুলি রয়েছে:

| কী | ধরন | পূর্বনির্ধারিত মান |
|----------------------|------|------------------|
| SprintDuration | uint64 | 64 |
| SpanDuration | uint64 | 100 * SprintDuration |
| ProducerCount | uint64 | 4 |


## CLI কমান্ড {#cli-commands}

### স্প্যান প্রস্তাবিত tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### বর্তমান স্প্যান সন্ধান {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

প্রত্যাশিত ফলাফল:

```go
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

### আইডি দ্বারা স্প্যান সন্ধান {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

এটি উপরোক্ত হিসাবে একই ফর্ম্যাট ফলাফলটি প্রিন্ট করে।

### প্যারামিটার {#parameters-1}

সমস্ত প্যারাম মুদ্রণ করতে;

```go
heimdalldcli query bor params
```

প্রত্যাশিত ফলাফল:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| নাম | পদ্ধতি | এন্ডপয়েন্ট |
|----------------------|------|------------------|
| স্প্যানের বিস্তারিত | GET | /bor/span/<span-id\> |
| সাম্প্রতিক স্প্যান পান | GET | /bor/latest-span |
| প্যারামগুলি পান | GET | /bor/params |
