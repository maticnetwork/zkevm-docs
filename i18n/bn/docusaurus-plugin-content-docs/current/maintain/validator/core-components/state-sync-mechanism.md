---
id: state-sync-mechanism
title: স্টেট সিঙ্ক প্রক্রিয়া
description: natively natively ে Ethereum ডেটা পড়তে স্টেট সিঙ্ক মেকানিজম
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Heimdall](/docs/maintain/glossary.md#heimdall) লেয়ার যাচাইকারীরা [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) ইভেন্টটি বেছে নেয় এবং [Bor](/docs/maintain/glossary.md#bor) লেয়ারে ইভেন্টটি পাঠিয়ে দেয়। এছাড়াও [Polygon আর্কিটেকচার](/docs/pos/polygon-architecture) দেখুন।

**প্রাপক চুক্তি**, [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) এবং [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) ফাংশনের মধ্যে কাস্টম লজিক সিটগুলি লাভ করে।

সর্বশেষ সংস্করণ, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), যেমন কয়েকটি উন্নতি রয়েছে:
1. স্টেট সিঙ্ক txs-এ ডেটার আকার সীমিত করে দাঁড়িয়েছে:
    * **30Kb** যখন **বাইটস** এ উপস্থাপন করা হয়
    * **60Kb** যখন **স্ট্রিং** হিসাবে উপস্থাপন করা হয়।
2. বিভিন্ন যাচাইকারীদের চুক্তির ইভেন্টগুলি মাঝে **বিলম্বের সময়** বাড়ানো হয়েছে এটি নিশ্চিত করার জন্য যে অতিরিক্ত ঘটনাবহুল হওয়ার অবস্থায় মিমপুল অত্যন্ত দ্রুত পূরণ হয় না যার ফলে চেইনটির অগ্রগতি হস্তক্ষেপ হতে পরে।

নিম্নলিখিত উদাহরণটি দেখায় কীভাবে ডেটার আকার সীমিত:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## ব্যবহারকারীদের জন্য প্রয়োজনীয়তা {#requirements-for-the-users}

স্টেট-সিঙ্ক এর সাথে কাজ করার জন্য dapps/ব্যবহারকারীদের থেকে প্রয়োজনীয় জিনিসগুলি হল:

1.  [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) ফাংশনটি কল করুন।
2. `syncState` ফাংশনটি `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);` নামে একটি ইভেন্ট প্রেরণ করে
3. Heimdall চেইনে সমস্ত যাচাইকারী `StateSynced` ইভেন্টটি পাবেন। কোনও যাচাইকারী স্টেট সিঙ্কের জন্য লেনদেনের ফি পাওয়ার আশা রাখলে লেনদেনটি Heimdall-এ পাঠান।
4. একবার Heimdall-এ `state-sync` লেনদেন একটি ব্লকে অন্তর্ভুক্ত হয়ে গেলে, এটি মুলতুবি থাকা স্টেট-সিঙ্ক তালিকায় যোগ করা হয়।
5. Bor-এ প্রত্যেক স্প্রিন্টের পরে, Bor নোড একটি API কলের মাধ্যমে Heimdall থেকে মুলতুবি থাকা স্টেট-সিঙ্ক ইভেন্টগুলি নিয়ে আসে।
6. প্রাপক চুক্তিটি `IStateReceiver` ইন্টারফেস এবং ডিকোডিং ডেটা বাইটের কাস্টম লজিক লাভ করে এবং [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) ফাংশনের ভিতন যেকোনো অ্যাকশন সিট সম্পাদন করে।
