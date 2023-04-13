---
id: antehandler
title: Ante হ্যান্ডলার
description: Ante হ্যান্ডলার চেক করে এবং লেনদেনটি যাচাই করে
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante হ্যান্ডলার {#ante-handler}

Ante হ্যান্ডলার লেনদেনটি পরীক্ষা করে এবং যাচাই করে। যাচাইকরণের পরে, এটি প্রেরকের পর্যাপ্ত ফি এবং সফল লেনদেনের অন্তর্ভুক্তির ক্ষেত্রে ফি কেটে নেওয়ার জন্য তার ব্যালেন্স পরীক্ষা করে।

## গ্যাসের সীমা {#gas-limit}

প্রতিটি ব্লক এবং লেনদেনের গ্যাস ব্যবহারের জন্য একটি সীমা রয়েছে। একটি ব্লকে একাধিক লেনদেন থাকতে পারে, কিন্তু একটি ব্লকে সমস্ত লেনদেনের গ্যাস ব্যবহার করা হবে তা হল বৃহত্তর ব্লকে এড়াতে ব্লক গ্যাসের চেয়ে কম।

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

মনে রাখবেন যে লেনদেনের উপর প্রতিটি স্টেট ম্যানিপুলেশনে গ্যাস খরচ হয়, লেনদেনের জন্য স্বাক্ষর যাচাইকরণ সহ।

### ব্লক গ্যাস সীমা {#block-gas-limit}

অ্যাপের ঐকমত্য প্যারামস প্রতিষ্ঠাপন করার সময় সর্বাধিক ব্লক গ্যাস সীমা এবং প্রতি ব্লকে বাইটগুলি গৃহীত হয়: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### লেনদেন গ্যাস সীমা {#transaction-gas-limit}

লেনদেনের গ্যাস সীমা `auth`মডিউলের প্যারামসে সংজ্ঞায়িত করা হয়। এটি Heimdall  `gov`মডিউলের মাধ্যমে পরিবর্তন করা যেতে পারে।

### চেকপয়েন্ট লেনদেন গ্যাস লিমিট {#checkpoint-transaction-gas-limit}

যেহেতু ব্লকটিতে একাধিক লেনদেন রয়েছে এবং Ethereum চেইনে এই বিশেষ লেনদেনটি যাচাই করে, তাই Merkle প্রমাণ প্রয়োজন। চেকপয়েন্ট লেনদেনের জন্য অতিরিক্ত Merkle প্রমাণ যাচাইকরণ এড়াতে, Heimdall শুধুমাত্র ব্লকের একটি লেনদেনের অনুমতি দেয় যদি লেনদেনের ধরণ `MsgCheckpoint`হয় ।

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## লেনদেন যাচাইকরণ এবং রিপ্লে সংরক্ষণ। {#transaction-verification-and-replay-protection}

Ante হ্যান্ডলার আসন্ন লেনদেনের স্বাক্ষর পরিচালনা ও যাচাই করে [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

রিপ্লে আক্রমণ এড়াতে প্রতিটি লেনদেন অবশ্যই `sequenceNumber`অন্তর্ভুক্ত থাকতে হবে। প্রতিটি সফল লেনদেন অন্তর্ভুক্তির পরে, Ante হ্যান্ডলার TX প্রেরক অ্যাকাউন্টের জন্য ক্রম সংখ্যা বৃদ্ধি করে যাতে পূর্ববর্তী লেনদেনের নকল (রিপ্লে) এড়ানো যায়।