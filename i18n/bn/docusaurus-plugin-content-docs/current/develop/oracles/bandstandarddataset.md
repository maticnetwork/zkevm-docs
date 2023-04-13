---
id: bandstandarddataset
title: ব্যান্ড স্ট্যান্ডার্ড ডেটাসেট
sidebar_label: Standard Dataset
description: ব্যান্ড Stardard ডেটাসেট ক্রিপ্টো অ্যাসেট, বিদেশী এক্সচেঞ্জ এবং commodities জুড়ে 196+ এর বেশি symbols জন্য রিয়েল-টাইম price তথ্য অফার করে।
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon এ তৈরি ডেভেলপাররা এখন Band Protocol's বিকেন্দ্রীভূত ওরাকল অবকাঠামো লিভারেজ করতে পারেন। ব্যান্ড প্রোটোকলের oracle এর সাথে সাথে, এখন তাদের অ্যাপ্লিকেশন মধ্যে সংহত করার জন্য তাদের বিভিন্ন cryptocurrency প্রাইস ডেটার অ্যাক্সেস আছে।

## সমর্থিত টোকেন {#supported-tokens}

বর্তমানে যে সকল প্রতীকগুলো সমর্থন করে তার তালিকা [data.bandprotocol.com](http://data.bandprotcool.com) এ পাবেন। ডেভেলাপারদের চাহিদা এবং কমিউনিটি ফিডব্যাকের উপর ভিত্তি করে ভবিষ্যতে এই তালিকাটিকে আরো বড় করা হবে।

## মূল্যের জোড় {#price-pairs}

নিম্নলিখিত পদ্ধতিগুলি বেস/কোট টোকেন জুটির যেকোনো কম্বিনেশনের সাথে কাজ করবে যদি ডেটাসেট দ্বারা সেই বেস ও কোট চিহ্ন সমর্থিত হয়।

### কুয়েরি প্রাইস {#querying-prices}

`StdReference`[`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)বর্তমানে,  

### সলিডিটি স্মার্ট চুক্তি {#solidity-smart-contract}

Band Protocol's oracle থেকে prices া প্রশ্নের জন্য, একটি স্মার্ট চুক্তি অবশ্যই Band's `StdReference`contract উল্লেখ করা উচিত, বিশেষ করে `getReferenceData`এবং `getReferenceDatabulk`পদ্ধতি।

`getReferenceData`যথাক্রমে ইনপুট, এবং `base`and `quote`াইল হিসাবে দুটি স্ট্রিং গ্রহণ করে। এটি তারপর সেই দুটি টোকেনের জন্য সর্বশেষ মূল্যের জন্য `StdReference` চুক্তিটিকে কুয়েরি করে এবং নিচের মত একটি `ReferenceData` স্ট্রাক্ট ফেরত দেয়।

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` পরিবর্তে দুইটি তালিকা গ্রহণ করে, এর মধ্যে একটি হচ্ছে `base` টোকেনের এবং অন্যটি হচ্ছে `quotes`। তারপর এটি প্রতিটি সূচকে প্রতিটি বেস/উদ্ধৃতি পেয়ারের মূল্য একই রকম প্রশ্নের জন্য এগিয়ে যাবে এবং of একটি অ্যারে ফেরত `ReferenceData`পাঠাবে।

উদাহরণস্বরূপ, আমরা যদি `['BTC','BTC','ETH']` এবং `['USD','ETH','BNB']` দিয়ে `getReferenceDataBulk` কল করি, তাহলে ফেরত দেয়া `ReferenceData` অ্যারেতে জুটি সংক্রান্ত তথ্য থাকবে:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## চুক্তির ঠিকানা {#contract-addresses}

| ব্লকচেইন | চুক্তির ঠিকানা |
| -------------------- | :------------------------------------------: |
| Polygon (টেস্ট) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

ব্যান্ডের নোড হেল্পার লাইব্রেরি [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) একটি অনুরূপ ফাংশন `getReferenceData` সমর্থন করে। এই ফাংশনে একটি আর্গুমেন্ট takes , ফলাফলের জন্য token of একটি তালিকা নিন। এটি তারপর সংশ্লিষ্ট মূল্যের মানের একটি তালিকা ফেরত দেয়।


### ব্যবহারের উদাহরণ {#example-usage}

নীচের কোডটি ফাংশনের একটি উদাহরণ ব্যবহার দেখায়:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

সংশ্লিষ্ট ফলাফল তারপর অনুরূপ হবে:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

প্রতিটি জুটির জন্য, নিম্নলিখিত তথ্য ফেরত দেওয়া হবে:

- `pair`: বেস/কোট সিম্বল জুটির স্ট্রিং
- `rate`: প্রদত্ত জুটির ফলাফলের হার
- `updated`: BandChain-এ বেস ও কোট সিম্বল আপডেট হবার সময়ের টাইম স্ট্যাম্প। `USD`জন্য, এই বর্তমান টাইমস্ট্যাম্প হবে।
- `rawRate`: এই অবজেক্টে দুইটি অংশ রয়েছে।
  - `value`হচ্ছে এর প্রকৃত মূল্যের `BigInt` মান, `10^decimals` দ্বারা গুণিত।
  - তাহলে `decimals` হল সেই সূচক যার দ্বারা `rate` কে গুণ করলে `rawRate` পাওয়া যায়

## ব্যবহারের উদাহরণ {#example-usage-1}

এই [চুক্তিটি](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) ব্যান্ডের `StdReference` চুক্তি এবং `getReferenceData` ফাংশন ব্যবহার করার একটি উদাহরণ প্রদর্শন করে।