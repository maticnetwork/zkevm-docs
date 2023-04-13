---
title: Tellor
description: "আপনার Polygon চুক্তিতে টেলার ওরাকল সংহত করার একটি গাইড।"
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor হলো এমন একটি ওরাকল যা সেন্সরশিপ প্রতিরোধী তথ্য সরবরাহ করে এবং তা সাধারণ ক্রিপ্টো-ইকোনমিক প্রণোদনা দ্বারা সুরক্ষিত থাকে। যেকেউ তথ্য প্রদান করতে পারে এবং সকলেই চেক করা যেতে পারেন। Tellor-এর নমনীয় কাঠামোটি সহজে পরীক্ষা/উদ্ভাবনের জন্য সুযোগ দিতে যেকোনো সময় যেকোনো তথ্য প্রদান করতে পারে।

## (সফট ) পূর্বশর্ত {#soft-prerequisites}

ওরাকলের দিকে মনোযোগ দিতে আমরা আপনার কোডিং দক্ষতার বিষয়ে নিম্নলিখিত বিষয়গুলো বিবেচনা করছি।

পূর্বধারণা:

- আপনি একটি টার্মিনাল নেভিগেট করতে পারেন
- আপনার npm ইনস্টল করা আছে
- নির্ভরশীলতা নিয়ন্ত্রণ করতে কীভাবে npm ব্যবহার করা যায় তা আপনি জানেন

Tellor হলো বাস্তবায়নের জন্য প্রস্তুত একটি লাইভ এবং ওপেন-সোর্সের ওরাকল। এই শিক্ষানবিস এর গাইড এখানে রয়েছে যার মধ্যে একজন Tellor, সাথে উঠতে এবং চলমান থাকতে পারে, একটি সম্পূর্ণ বিকেন্দ্রীভূত এবং censorship-resistant ওরাকল দিয়ে আপনার প্রকল্প সরবরাহ করে।

## সংক্ষিপ্ত বিবরণ {#overview}

Tellor হলো একটি ওরাকল সিস্টেম, যেখানে পক্ষগুলো একটি অফ-চেইন ডেটা পয়েন্টের মানের (যেমন BTC/USD) জন্য অনুরোধ করতে পারে এবং রিপোর্টকারীরা একটি অন-চেইন ডেটা-ব্যাংকে এই মানটি যোগ করতে প্রতিযোগিতা করে এবং এই ডেটা-ব্যাংকটিতে সকল Polygon স্মার্ট চুক্তি প্রবেশ করতে পারে। এই ডেটা-ব্যাঙ্কের ইনপুটগুলো স্ট্যাক করা রিপোর্টকারীদের মাধ্যমে সুরক্ষিত রয়েছে। Tellor ক্রিপ্টো-ইকোনমিক ইনসেন্টিভ পদ্ধতি ব্যবহার করে। Tellor-এর টোকেন ইস্যু করার মাধ্যমে রিপোর্টকারীদের জমা দেওয়া সত্য ডেটাকে পুরস্কৃত করা হয়। কেউ খারাপ কাজ করলে তাকে দ্রুত শাস্তি দেওয়া হয় এবং একটি নালিসি প্রক্রিয়ার মাধ্যমে নেটওয়ার্ক থেকে সরিয়ে ফেলা হয়।

এই টিউটোরিয়ালে আমরা যা দেখবো:

- প্রাথমিক টুলকিট সেট আপ করা হলে আপনাকে প্রস্তুত করে তা চালিয়ে যেতে হবে।
- একটি সহজ উদাহরণ দেখা যাক।
- আপনি বর্তমানে Tellor পরীক্ষা করতে পারেন এমন নেটওয়ার্কগুলোর টেস্টনেটের ঠিকানার তালিকা করুন।

## UsingTellor {#usingtellor}

আপনি প্রথমে যে কাজটি করতে চাইবেন তা হলো Tellor-কে আপনার ওরাকল হিসেবে ব্যবহার করার জন্য প্রয়োজনীয় মৌলিক সরঞ্জাম ইনস্টল করা। Tellor ব্যবহারকারীর চুক্তি ইনস্টল করতে [এই প্যাকেজটি](https://github.com/tellor-io/usingtellor) ব্যবহার করুন:

`npm install usingtellor`

একবার ইনস্টল করা হলে তা আপনার চুক্তিগুলোকে 'UsingTellor' থেকে ফাংশনগুলো পেতে সাহায্য করবে।

চমৎকার! এখন আপনার সরঞ্জামগুলো প্রস্তুত আছে, একটি সহজ অনুশীলন করা যাক, যেখানে আমরা বিটকয়েনের মূল্য পুনরুদ্ধার করবো:

### BTC/USD উদাহরণ {#btc-usd-example}

UsingTellor চুক্তি সংগ্রহ করুন, Tellor ঠিকানাটিকে একটি কন্সট্রাকটর আর্গুমেন্ট হিসেবে পাস করুন:

এখানে একটি উদাহরণ দেওয়া হলো:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## ঠিকানা: {#addresses}

Tellor ট্রিবিউট: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

ওরাকল: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### প্রথমে কিছু পরীক্ষা করতে চাচ্ছেন?: {#looking-to-do-some-testing-first}

Polygon মুম্বাই টেস্টনেট: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

টেস্ট ট্রিবিউট:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

কিছু টেস্ট টোকেন দরকার? ['@trbfaucet'](https://twitter.com/trbfaucet)

ব্যবহারের সহজতর জন্য, UsingTellor repo সহজ ইন্টিগ্রেশন জন্য [Tellor Playground চুক্তির](https://github.com/tellor-io/TellorPlayground) একটি সংস্করণ নিয়ে আসে। সহায়ক ফাংশনের একটি তালিকা জন্য [এখানে](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) দেখুন।

#### Tellor ওরাকল আরো ভালোভাবে বাস্তবায়নের জন্য, [এখানে](https://github.com/tellor-io/usingtellor/blob/master/README.md) উপলভ্য ফাংশনগুলোর পুর্ণাঙ্গ তালিকাটি দেখুন।

#### এখনও প্রশ্ন আছে? [এখানে](https://discord.gg/tellor) কমিউনিটি যোগ দিন!
