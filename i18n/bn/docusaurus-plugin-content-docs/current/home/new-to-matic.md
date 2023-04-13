---
id: new-to-polygon
title: Polygon এ স্বাগতম
description: Polygon এ আপনার পরবর্তী blockchain অ্যাপ্লিকেশন তৈরি করুন
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Polygon এ স্বাগতম {#welcome-to-polygon}

Polygon পাবলিক ব্লকচেইনের একটি স্কেলিং সমাধান হিসেবে কাজ করে। Polygon PoS দ্রুত এবং সস্তা লেনদেনের পাশাপাশি বিদ্যমান সকল Ethereum উপকরণকে সমর্থন করে।

## Polygon-এ ইন্টারঅ্যাকশন প্রকার {#types-of-interaction-on-polygon}

* [Polygon PoS চেইন](/docs/develop/getting-started)
* [Ethereum + PoS ব্রিজ সহ Polygon](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Plasma ব্রিজ সহ Polygon](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## ব্লকচেইনকে প্রশ্ন করুন {#query-the-blockchain}

বেশিরভাগ ব্লকচেইনের ইন্টারেকশনে এর স্টেট পড়ার বিষয়টি জড়িত থাকে।

Alchemy ব্লকচেইনে মৌলিক অনুরোধ কিভাবে করতে হবে তার উপর একটি রেফারেন্স গাইড প্রদান করে। [Polygon কিভাবে প্রশ্ন করতে হবে তার](https://docs.alchemy.com/reference/polygon-sdk-examples) উপর তাদের গাইড দেখুন।

## স্মার্ট চুক্তি ডিপ্লয় করুন {#deploy-smart-contracts}

* Polygon-এ আপনার চুক্তিগুলো ডিপ্লয় করুন
    - [Alchemy ব্যবহার করে](/docs/develop/alchemy)
    - [Chainstack ব্যবহার করে](/docs/develop/chainstack)
    - [QuickNode ব্যবহার করে](/docs/develop/quicknode)
    - [Remix ব্যবহার করে](/docs/develop/remix)
    - [Truffle ব্যবহার করে](/docs/develop/truffle)
    - [Hardhat ব্যবহার করে](/docs/develop/hardhat)

:::note

RPC-URL Web3 RPC-URL কনফিগার করুন, অন্য সব কিছুই একই থাকবে।

:::

## ব্লকচেইন কী? {#what-is-a-blockchain}

সহজ কোথায়, ব্লকচেইন হলো লেনদেন রেকর্ড করার, অ্যাসেট ট্র্যাক করার এবং বিশ্বাস তৈরি করার জন্য একটি শেয়ারকৃত, অপরিবর্তনীয় লেজার। আরো পড়তে [ব্লকচেইনের মৌলিক বিষয়াবলী](blockchain-basics/basics-blockchain.md) দেখুন।

## সাইডচেইন কী? {#what-is-a-sidechain}

সাইডচেইনকে 'প্যারেন্ট' ব্লকচেইনের একটি ক্লোন হিসেবে বিবেচনা করুন, যা মেইন চেইন থেকে ও মেইন চেইনে এসেট ট্রান্সফারকে সমর্থন করে। সহজ কথায়, এটি প্যারেন্ট চেইনের একটি বিকল্প, যা ব্লক তৈরির ক্ষেত্রে এর নিজস্ব মেকানিজম (সর্বসম্মত মেকানিজম) ব্যবহার করে একটি নতুন ব্লকচেইন তৈরি করে। কোনো সাইডচেইনকে একটি প্যারেন্ট চেইনে সংযুক্ত করার অর্থ হলো চেইনগুলোর মধ্যে এসেট স্থানান্তর করার একটি পদ্ধতি নির্ধারণ করা।

## যাচাইকারী এবং ডেলিগেটরের ভূমিকা {#validator-and-delegator-roles}

Polygon নেটওয়ার্কে, আপনি একজন যাচাইকারী বা ডেলিগেটর হতে পারেন। দেখুন:

* [যাচাইকারী কে](/docs/maintain/polygon-basics/who-is-validator)
* [ডেলিগেটর কে](/docs/maintain/polygon-basics/who-is-delegator)

## আর্কিটেকচার {#architecture}

আপনার লক্ষ্য যদি যাচাইকারী হওয়া হয়ে থাকে, তবে আপনার জন্য Polygon-এর আর্কিটেকচার বোঝা খুবই গুরুত্বপূর্ণ।

[Polygon-এর আর্কিটেকচার](/docs/maintain/validator/architecture) দেখুন।

### উপাদান {#components}

Polygon আর্কিটেকচার সম্পর্কে বিস্তারিত বোঝার জন্য, মূল উপাদানগুলো দেখুন:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [চুক্তি](/docs/pos/contracts/stakingmanager)

#### কোডবেস {#codebases}

মূল উপাদানগুলো সম্পর্কে বিস্তারিত বোঝার জন্য, কোডবেস দেখুন:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [চুক্তি](https://github.com/maticnetwork/contracts)

## নির্দেশিকা {#how-tos}

### নোড সেটআপ {#node-setup}

আপনি যদি Polygon Mainnet বা Mumbai Testnet-এ একটি সম্পূর্ণ নোড রান করতে চান তবে আপনি অনুসরণ করতে পারেন [একটি Validator Node](/maintain/validate/run-validator.md) গাইড চালান ।

### স্ট্যাকিং-এর কার্যক্রম {#staking-operations}

* [যাচাইকারী স্ট্যাকিং-এর কার্যক্রম](/docs/maintain/validate/validator-staking-operations)
* [ডেলিগেট](/docs/maintain/delegate/delegate)

### বাইরের রিসোর্স {#external-resources}
- [আপনার প্রথম DApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [সাইডচেইন এবং চাইল্ডচেইন](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)