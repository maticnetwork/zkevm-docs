---
id: checkpoint
title: চেকপয়েন্ট
description: মডিউল যে চেকপয়েন্ট-সম্পর্কিত কার্যকারিতা পরিচালনা করে
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# চেকপয়েন্ট {#checkpoint}

`checkpoint` মডিউল Heimdall-এর জন্য চেকপয়েন্ট সম্পর্কিত কার্যকারিতাগুলি পরিচালনা করে। চেকপয়েন্ট রুট হ্যাশ যাচাই করার জন্য হেইমডালে একটি নতুন চেকপয়েন্ট প্রস্তাব করা হলে এটির Bor চেইনের প্রয়োজন হয়।

চেকপয়েন্ট ডেটা সম্পর্কিত সমস্ত [এখানে](/docs/pos/heimdall/checkpoint) বিস্তারিত ব্যাখ্যা করা হয়।

## চেকপয়েন্ট জীবন-চক্র {#checkpoint-life-cycle}

Heimdall পরবর্তী প্রস্তাবকারী নির্বাচন করতে একই নেতা নির্বাচন অ্যালগরিদম ব্যবহার করে। Ethereum চেইনে চেকপয়েন্ট জমা দেওয়ার সময়, গ্যাস সীমা, Ethereum এ ট্র্যাফিক, উচ্চ গ্যাস ফি এর মতো একাধিক কারণে এটি ব্যর্থ হতে পারে। এই কারণেই মাল্টি-স্টেজ চেকপয়েন্ট প্রক্রিয়া প্রয়োজন।

প্রতিটি চেকপয়েন্ট প্রস্তাব হিসাবে যাচাইকারী আছে। যদি Ethereum চেইনে চেকপয়েন্ট ব্যর্থ হয় বা সফল succeeds, `ack`এবং `no-ack`লেনদেনটি পরবর্তী for জন্য Heimdall এ প্রস্তাবকারী পরিবর্তন করবে। নিম্নলিখিত ফ্লো চার্ট চেকপয়েন্টের জীবনচক্র প্রতিনিধিত্ব করে:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## মেসেজ {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint`Heimdall-এ চেকপয়েন্ট যাচাইকরণ পরিচালনা করে। শুধুমাত্র এই বার্তাটি RLP এনকোডিং ব্যবহার করে কারণ এটি Ethereum চেইনে যাচাই করা প্রয়োজন।

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

একবার এই লেনদেনটি Heimdall এ প্রক্রিয়াকরা হয়ে গেলে,  `proposer`এই লেনদেনের জন্য Tendermint থেকে  `votes`এবং  `sigs`নেয় এবং Ethereum চেইনে চেকপয়েন্ট পাঠায়।

যেহেতু ব্লকটিতে একাধিক লেনদেন রয়েছে এবং Ethereum চেইনে এই বিশেষ লেনদেনটি যাচাই করে, তাই Merkle প্রমাণ প্রয়োজন। Ethereum-এ অতিরিক্ত Merkle প্রুফ যাচাইকরণ এড়ানোর জন্য, Heimdall শুধুমাত্র ব্লকের একটি লেনদেনের অনুমতি দেয় যদি লেনদেনের ধরণ হয় `MsgCheckpoint`

এই প্রক্রিয়াটিকে অনুমতি দেওয়ার জন্য, Heimdall `MsgCheckpoint`লেনদেনকে উচ্চ গ্যাস ব্যবহৃত লেনদেন হিসাবে সেট করে। চেক করুন [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```


প্রকৃত চেকপয়েন্ট তালিকার অবস্থার পরিবর্তে,
এই লেনদেন `checkpointBuffer`রাজ্যে প্রস্তাবিত চেকপয়েন্ট সংরক্ষণ করবে।

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` সফল চেকপয়েন্ট জমা পরিচালনা করে। এখানে একটি চেকপয়েন্ট কাউন্টার `HeaderBlock`আছে;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```



বৈধ `TxHash`
এবং
`LogIndex` এর জন্য
 জমা দেওয়া চেকপয়েন্টের জন্য, এই লেনদেনটি নিম্নলিখিত ইভেন্টটি যাচাই করে এবং `checkpointBuffer`এ চেকপয়েন্ট যাচাই করে। স্টেট[ :https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

সফল ইভেন্ট যাচাইকরণের পরে, এটি চেকপয়েন্টের প্রকৃত গণনা আপডেট করে, যা বলা `ackCount`এবং ক্লিয়ার করা হয়।`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` অ-সফল চেকপয়েন্ট বা অফলাইন প্রস্তাবকগুলি পরিচালনা করে।
এই লেনদেনটি কেবলমাত্র নিম্নলিখিত ঘটনাগুলি থেকে `CheckpointBufferTime` পাস করার পরে বৈধ হবে:


- সর্বশেষ সফল  `ack`লেনদেন
- সর্বশেষ সফল  `no-ack`লেনদেন

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Heimdall পরবর্তী চেকপয়েন্টের জন্যএকটি নতুন `proposer`বেছে নেওয়ার আগে এই লেনদেনটি বর্তমান প্রস্তাবকের জন্য চেকপয়েন্ট/ack প্রেরণের সময়সীমা দেয়।

## প্যারামিটার {#parameters}

চেকপয়েন্ট মডিউলে নিম্নলিখিত প্যারামিটার রয়েছে:

| কী | ধরন | পূর্বনির্ধারিত মান |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * সময়।সেকেন্ড |


## CLI কমান্ড {#cli-commands}

### প্যারামগুলি {#params}

সমস্ত প্যারাম মুদ্রণ করতে:

```go
heimdallcli query checkpoint params --trust-node
```

প্রত্যাশিত ফলাফল:

```yaml
checkpoint_buffer_time: 16m40s
```

### চেকপয়েন্ট প্রেরণ করুন {#send-checkpoint}

নিম্নলিখিত কমান্ড Heimdall-এ চেকপয়েন্ট লেনদেন পাঠায়:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### পাঠান`ack`

নিম্নলিখিত কমান্ড Heimdall-এ ack লেনদেন পাঠায়, যদি চেকপয়েন্ট Ethereum-এ সফল হয়:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### পাঠান`no-ack`

নিম্নলিখিত কমান্ড Heimdall-এ no-ack লেনদেন পাঠায়:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| নাম | পদ্ধতি | এন্ডপয়েন্ট |
|----------------------|------|------------------|
| বর্তমান চেকপয়েন্ট বাফার স্টেটটি পান | পেতে | /চেকপয়েন্ট/বাফার |
| চেকপয়েন্ট গণনা পান | পেতে | /চেকপয়েন্ট /গণনা |
| ব্লক সূচক দ্বারা চেকপয়েন্ট বিবরণ পান | পেতে | /চেকপয়েন্ট /হেডার/<header-block-index\> |
| সর্বশেষ চেকপয়েন্ট পান | পেতে | /চেকপয়েন্ট/সর্বশেষ চেকপয়েন্ট |
| শেষ no-ack বিবরণ পান | পেতে | /চেকপয়েন্ট/last-no-ack |
| প্রদত্ত শুরু এবং শেষ ব্লকের জন্য চেকপয়েন্ট বিবরণ | পেতে | /চেকপয়েন্ট/<start\>/<end\> |
| সংখ্যা অনুযায়ী চেকপয়েন্ট | পেতে | /চেকপয়েন্ট/<checkpoint-number\> |
| সমস্ত চেকপয়েন্ট | পেতে | /চেকপয়েন্ট/তালিকা |
| ack গণনা , বাফার, যাচাইকারী সেট, যাচাইকারী গণনা এবং সর্বশেষ no-ack বিবরণ পান | পেতে | /সংক্ষিপ্ত বিবরণ |


সকল query ে API-এর নিম্নলিখিত ফর্ম্যাটে ফলাফল প্রদান করবে:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
