---
id: clerk
title: Clerk
description: মডিউল যা Ethereum থেকে Bor থেকে জেনেরিক state-sync পরিচালনা করে
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

Clerk, Ethereum চেইন থেকে Bor চেইনে জেনেরিক স্টেট-সিঙ্ক পরিচালনা করে। Heimdall স্টেট সিঙ্ক এ সম্মত হয়, যা Clerk মডিউল ব্যবহার করে Ethereum চেইনে শুরু করা হয়।

[স্টেট সিঙ্ক](/docs/pos/bor/core_concepts.md#state-management-state-sync) মেকানিজমে আরও বিস্তারিত পাওয়া গেছে।

## মেসেজ {#messages}

### MsgEventRecord {#msgeventrecord}

`StateSender.sol` এর থেকে থেকে ইভেন্টগুলি যাচাই করা এবং Bor এর ব্যবহারের জন্য Heimdall-এ স্টেট সংরক্ষণ করার জন্য `MsgEventRecord` লেনদেন দায়বদ্ধ।

হ্যান্ডলার এই লেনদেনের জন্য যে কোনও প্রদত্ত `msg.TxHash` এবং `msg.LogIndex` বৈধ করে। লেনদেনটি একবারের বেশি প্রসেস করার চেষ্টা করা হলে এটি `Older invalid tx found` ত্রুটি দেখায়।

লেনদেনের মেসেজের একটি কাঠামো এখানে দেওয়া হল:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLI কমান্ড {#cli-commands}

### স্টেট রেকর্ড লেনদেন পাঠায় {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### অনুসন্ধান করতে স্টেট ইভেন্ট রেকর্ড ইতিমধ্যে যাচাই করা হয়েছে {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| নাম | পদ্ধতি | এন্ডপয়েন্ট |
|----------------------|------|------------------|
| ইভেন্ট রেকর্ড এর বিবরণ | পেতে | /clerk/event-record/<record-id\> |
| সব ইভেন্টের রেকর্ড | পেতে | /clerk/event-record/list |
