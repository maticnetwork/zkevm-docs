---
id: governance
title: প্রশাসন
sidebar_label: Governance
description: একটি 1 টোকেন সহ সিস্টেম - 1 ভোট ভিত্তি
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# পরিচালনা {#governance}

Heimdall governance [`x/gov`Cosmos-sdk মডিউল](https://docs.cosmos.network/master/modules/gov/) ঠিক একই কাজ করে।

এই সিস্টেমে, চেইনের নেটিভ স্টেকিং টোকেনধারীরা `1 token = 1 vote`ভিত্তিতে প্রস্তাবে ভোট দিতে পারে। এখানে বর্তমানে সমর্থিত মডিউলের ফিচারগুলির একটি তালিকা:

- **প্রস্তাব জমা
** যাচাইকারীরা ডিপোজিট সহ প্রস্তাব জমা দিতে পারেন। একবার সর্বনিম্ন ডিপোজিট পৌঁছানোর পরে, প্রস্তাবটি ভোটের সময়কালে প্রবেশ করে। প্রস্তাবগুলিতে জমা দেওয়া যাচাইকারীরা প্রস্তাবটি প্রত্যাখ্যান বা গৃহীত হওয়ার পরে তাদের ডিপোজিট পুনরুদ্ধার করতে পারে।
- **ভোট:** যাচাইকারী MinDeposit পৌঁছেছে এমন প্রস্তাবে ভোট দিতে পারে।

 `gov`মডিউলে প্যারামস হিসাবে ডিপোজিট পিরিয়ড এবং ভোটের সময়কাল রয়েছে। ডিপোজিট পিরিয়ড শেষ হওয়ার আগে নূন্যতম আমানত অর্জন করা উচিত, অন্যথা, া প্রস্তাব স্বয়ংক্রিয়ভাবে প্রত্যাখ্যাত হবে।

ডিপোজিট পিরিয়ডের মধ্যে ন্যূনতম ডিপোজিট পৌঁছে গেলে, ভোটের সময়কাল শুরু হয়। ভোটের সময়কালে, সমস্ত যাচাইকারীদের প্রস্তাবের জন্য তাদের পছন্দের ভোট দেওয়া উচিত। ভোটের সময়কাল শেষ হওয়ার পরে,  
(`gov/Endblocker.go`  `tally`ফাংশনকে সম্পাদন করে এবং `tally_params` - `quorum`, `threshold`এবং `veto` এর উপর ভিত্তি করে প্রস্তাব গ্রহণ বা প্রত্যাখ্যান করে।


উৎস: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Heimdall-এ বিভিন্ন ধরনের প্রস্তাব বাস্তবায়ন করা যেতে পারে। এখন পর্যন্ত, এটি শুধুমাত্র **Param পরিবর্তন প্রস্তাব** সমর্থন করে।

### প্যারাম পরিবর্তনের প্রস্তাব {#param-change-proposal}

এই ধরনের প্রস্তাব ব্যবহার করে, যাচাইকারী `params`Heimdall-এর যে কোন কোন `module`পরিবর্তন করতে পারেন।

উদাহরণ:
`auth` মডিউলে লেনদেনের জন্য সর্বনিম্ন `tx_fees` পরিবর্তন করুন। যখন প্রস্তাবটি গৃহীত হয়, তখন এটি স্বয়ংক্রিয়ভাবে Heimdall স্টেটে  `params`পরিবর্তন করে। কোনো অতিরিক্ত কর প্রয়োজন নেই।

## CLI কমান্ড {#cli-commands}

### ক্যোয়ারী গভ প্যারাম {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

এটি পরিচালনা মডিউলের জন্য সমস্ত প্যারাম দেখায়।

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### প্রস্তাব জমা দিন {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` একটি ফাইল যা জেসন বিন্যাসে প্রস্তাব অন্তর্ভুক্ত করে।

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### কোয়েরি প্রস্তাব {#query-proposal}

সকল প্রস্তাব প্রশ্নের জন্য:

```go
heimdallcli query gov proposals --trust-node
```

একটি নির্দিষ্ট প্রস্তাব প্রশ্নের জন্য:

```go
heimdallcli query gov proposals 1 --trust-node
```

### প্রস্তাবে ভোট দিন {#vote-on-proposal}

একটি নির্দিষ্ট প্রস্তাবে ভোট দিতে:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

ভোটের সময় শেষে প্রস্তাব স্বয়ংক্রিয়ভাবে গণনা করা হবে।

## REST API {#rest-apis}

| নাম | পদ্ধতি | এন্ডপয়েন্ট |
|----------------------|------|------------------|
| সব প্রস্তাব পান | পেতে | /গভ/প্রস্তাব |
| প্রস্তাবের বিবরণ পান | পেতে | /গভ/প্রস্তাবসমূহ/`proposal-id` |
| প্রস্তাবের জন্য সমস্ত ভোট পান | পেতে | /গভ/প্রস্তাবসমূহ/ `proposal-id`/ভোট |
