---
id: auth
title: Auth
description: বেস লেনদেনের এবং অ্যাকাউন্ট ধরনের নির্দিষ্ট করার জন্য মডিউল
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# অথ মডিউল {#auth-module}

এই ডকুমেন্ট Heimdall এর `auth`মডিউলটি বর্ণনা করে।

একটি অ্যাপ্লিকেশনের জন্য মূল লেনদেন এবং অ্যাকাউন্টের ধরনের নির্দিষ্ট করার জন্য `auth`মডিউলটি দায়ী। এটিতে অ্যান্টে হ্যান্ডলার রয়েছে, যেখানে সমস্ত প্রাথমিক লেনদেনের বৈধতা পরীক্ষাগুলি (স্বাক্ষর, ননসেস, সহায়ক ক্ষেত্র) সম্পন্ন করা হয় এবং অ্যাকাউন্ট রক্ষককে প্রকাশ করে, যা অন্যান্য মডিউলগুলিকে পড়তে, লিখতে এবং অ্যাকাউন্ট সংশোধন করতে দেয়।

## গ্যাস এবং ফি {#gas-and-fees}

ফিগুলি নেটওয়ার্কের একটি অপারেটরের জন্য দুটি কাজ করে।

ফি প্রতিটি সম্পূর্ণ নোড দ্বারা সংরক্ষিত স্টেটের বৃদ্ধি সীমিত করে এবং সামান্য অর্থনৈতিক মূল্যের লেনদেনের সাধারণ উদ্দেশ্যের সেন্সরশিপের অনুমতি দেয়। ফিগুলি একটি অ্যান্টি-স্প্যাম প্রক্রিয়া হিসাবে সবচেয়ে ভাল মানান্সই করা হয়, যেখানে যাচাইকারীরা নেটওয়ার্ক ব্যবহার এবং ব্যবহারকারীদের সনাক্তকরণের ক্ষেত্রে অনাগ্রহী।

যেহেতু Heimdall কোন লেনদেনের জন্য কাস্টম চুক্তি বা কোড সমর্থন করে না, তাই এটি ফিক্সড খরচ লেনদেনের ব্যবহার করে। স্থির খরচের লেনদেনের জন্য, যাচাইকারী Ethereum চেইনে তাদের অ্যাকাউন্ট টপ আপ করতে এবং [Topup](Topup.md) মডিউল ব্যবহার করে Heimdall-এ টোকেন পেতে পারেন।

## প্রকার {#types}

অ্যাকাউন্টের পাশাপাশি (স্টেটে নির্দিষ্ট করা হয়েছে), অথ মডিউলের দ্বারা উন্মুক্ত ধরনের **হল StdSignature**, একটি ঐচ্ছিক পাবলিক কী এবং একটি বাইট অ্যারে হিসাবে একটি ক্রিপ্টোগ্রাফিক স্বাক্ষর সংমিশ্রণ, **StdTx**, একটি স্ট্রাক্ট যা **StdSignature,** এবং S**tdSignDoc,** এর ব্যবহার করে `sdk.Tx`ইন্টারফেসের প্রয়োগ করে এবং S**tdTx **এর জন্য একটি replay-prevention স্ট্রাকচার, যা লেনদেনের প্রেরক অবশ্যই সাইন আপ করতে হবে।

### StdSignature {#stdsignature}

একটি `StdSignature` হল একটি বাইট অ্যারের ধরন।

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

একটি  হল `StdTx`একটি স্ট্রাকচার যা `sdk.Tx` ইন্টারফেস কার্যকর করে এবং অনেক ধরনের লেনদেনের উদ্দেশ্য সাধন করতে যথেষ্ট জেনেরিক হতে পারে।

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

একটি `StdSignDoc` হল স্বাক্ষরিত হতে হবে এমন একটি রিপ্লে-প্রতিরোধক স্ট্রাকচার, যা নিশ্চিত করে যে কোনও জমা করা লেনদেন (একটি নির্দিষ্ট বাইট স্ট্রিং-এর উপর কেবল একটি স্বাক্ষর) শুধুমাত্র একটি Heimdall-এ একবার সম্পাদন করার যোগ্য হবে।

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### অ্যাকাউন্ট {#account}

এটি লেনদেনগুলির জন্য ঠিকানা, কয়েন এবং নন্স পরিচালনা করে। এটি লেনদেনগুলি স্বাক্ষর এবং বৈধতাও যাচাই করে।

সূত্র: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## প্যারামিটার {#parameters}

অথ মডিউলটিতে নিম্নলিখিত প্যারামিটারগুলি রয়েছে:

| কী | ধরন | পূর্বনির্ধারিত মান |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSiglimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | স্ট্রিং | "1000000000000000" |


## CLI কমান্ড {#cli-commands}

### অ্যাকাউন্ট দেখান {#show-account}

Heimdall-এ অ্যাকাউন্ট সম্পর্কিত ডেটা মুদ্রণ করতে;

```bash
heimdalld show-account
```

প্রত্যাশিত ফলাফল:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### অ্যাকাউন্ট এবং কয়েনের বিবরণ {#account-and-coin-details}

অ্যাকাউন্ট বিবরণ, কয়েন, sequence এবং অ্যাকাউন্ট নম্বর প্রদর্শন করতে;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

প্রত্যাশিত ফলাফল:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### প্যারামিটার {#parameters-1}

সমস্ত প্যারাম মুদ্রণ করতে;

```go
heimdallcli query auth params
```

প্রত্যাশিত ফলাফল:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| নাম | এন্ডপয়েন্ট | বিবরণ |
|----------------------|--------|------------------|
| অ্যাকাউন্টের বিবরণ | /auth/accounts/{address} | একটি ঠিকানার জন্য সমস্ত বিবরণ ফিরিয়ে আনে |
| অ্যাকাউন্ট ক্রমের বিবরণ | /auth/accounts/{address}/sequence | স্বাক্ষর করার জন্য শুধুমাত্র প্রয়োজনীয় বিবরণ ফিরিয়ে আনে |
| অথ প্যারাম | /auth/params | সমস্ত প্যারাম অথ মডিউল ব্যবহার করা ফিরিয়ে আনে |
