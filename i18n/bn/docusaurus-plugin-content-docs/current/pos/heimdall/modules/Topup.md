---
id: topup
title: Topup
description: Heimdall চেইনে ফি দিতে ব্যবহৃত একটি পরিমাণ
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall টপ-আপ একটি অর্থরাশি যা Heimdall চেইনে ফি পরিশোধ করতে ব্যবহার করা হবে।

আপনার অ্যাকাউন্ট টপআপ করার দুটি উপায় রয়েছে:

1. নতুন যাচাইকারী যোগদান করার পরে, তারা staked পরিমাণের পাশাপাশি top-up হিসাবে একটি `topup`পরিমাণ উল্লেখ করতে পারে, যা Heimdall চেইনে balance এ ব্যালেন্স হিসাবে স্থানান্তরিত হবে।
2. একজন ব্যবহারকারী Heimdall-এ top-up ব্যালেন্স বাড়ানোর জন্য Ethereum এ স্ট্যাকিং স্মার্ট contract সরাসরি top-up ফাংশন কল করতে পারেন।

## মেসেজ {#messages}

### MsgTopup {#msgtopup}

স্টেকিং ম্যানেজার কন্ট্র্যাক্টে Ethereum চেইনের `TopUpEvent`-এর উপর ভিত্তি করে Heimdall এ একটি ঠিকানায় ব্যালেন্স তৈরি করার জন্য`MsgTopup`  লেনদেনটি দায়ী।

এই লেনদেনের জন্য হ্যান্ডলার টপ-আপ প্রক্রিয়া করে এবং প্রদত্ত কোনও `msg.TxHash` এবং `msg.LogIndex` এর জন্য শুধুমাত্র একবার ব্যালেন্স বৃদ্ধি করে। একবারের বেশি টপ-আপ প্রক্রিয়া করার চেষ্টা করলে এটি `Older invalid tx found` ত্রুটি দেখায়।

টপ-আপ লেনদেনের মেসেজের স্ট্রাকচারটি এখানে দেওয়া হল:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

Heimdall থেকে Ethereum চেইনে ব্যালেন্স উইথড্র করার জন্য `MsgWithdrawFee` লেনদেনটি দায়ী। একজন যাচাইকারী Heimdall থেকে যে কোনও অর্থরাশি উইথড্র করতে পারেন।

প্রদত্ত যাচাইকারীর থেকে ব্যালেন্স কেটে নিয়ে হ্যান্ডলার উইথড্রটি প্রক্রিয়া করেন এবং পরবর্তী চেকপয়েন্ট পাঠানোর জন্য স্টেটটি প্রস্তুত করেন। পরবর্তী সম্ভাব্য চেকপয়েন্টে নির্দিষ্ট যাচাইকারীর জন্য উইথড্র সম্পর্কিত স্টেট থাকবে।

`ValidatorAddress` এর উপর ভিত্তি করে হ্যান্ডলার যাচাইকারীর তথ্য পান এবং উইথড্রটি. প্রক্রিয়া করেন।

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLI কমান্ড {#cli-commands}

### টপআপ ফি {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### উইথড্র ফি {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

অ্যাকাউন্টে প্রতিফলিত টপ-আপ চেক করতে নিম্নলিখিত কমান্ড রান করায়

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| নাম | পদ্ধতি | URL | মূল পাঠ্যের প্যারামগুলি |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| টপআপ ফি | পোস্ট | /topup/fee | `id` যাচাইকারী আইডি, `tx_hash` Ethereum চেইনে সফল টপ-আপ ইভেন্টে লেনদেনের হ্যাশ, `log_index` Ethereum চেইনে নির্গত টপ-আপ ইভেন্টের লগ ইনডেক্স |
| উইথড্র ফি | পোস্ট | /topup/withdraw | `amount` উইথড্র অর্থরাশি |
