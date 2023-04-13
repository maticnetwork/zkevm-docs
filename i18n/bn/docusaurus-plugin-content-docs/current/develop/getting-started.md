---
id: getting-started
title: Polygon PoS পরিচিতি
sidebar_label: Quick Start
description: আপনার পরবর্তী ব্লকচেইন অ্যাপটি Polygon-এ তৈরি করুন।
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution ডেভেলপমেন্ট ডকুমেন্টগুলি আপডেট করা

ডকুমেন্টগুলি আপডেট, উন্নত ও পরিবর্ধন করা হচ্ছে। সেগুলি পরিবর্তন সাপেক্ষ।
আপনার কোনো প্রশ্ন বা পরামর্শ থাকলে দয়া করে একটি ইস্যু রেইজ বা অনুরোধ পুল করতে দ্বিধা বোধ করবেন না।

:::

**Polygon-এ (প্রাক্তন Matic নেটওয়ার্ক)** আপনাকে স্বাগতম! আপনার ব্লকচেইন অ্যাপ্লিকেশন ডেভেলাপ করার সবচেয়ে উদ্ভাবনী ও আকর্ষণীয় প্ল্যাটফর্ম। ব্লকচেইন প্রযুক্তি ডিজিটাল বিশ্বের ডেটা ও ব্যবসা পরিচালনাতে বিপ্লব ঘটানোর জন্য সম্পূর্ণরূপে প্রস্তুত আছে। আপনিও Polygon-এর ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন (dApp) ডেভেলাপমেন্টে হাত বাড়িতে দিয়ে এই বিপ্লবের একটি অংশ হয়ে উঠতে পারেন।

এই নির্দেশিকাটি আপনাকে Polygon-এর ইকোসিস্টেমের সাথে পরিচয় করিয়ে দিবে। আপমি অনেক মূল্যবান রিসোর্স ও ওয়েবসাইটের লিঙ্ক পাবেন যার ফলে আপনি Polygon-এর পাশাপাশি অন্যান্য সাধারণ ব্লকচেইন অ্যাপ্লিকেশন ডেভেলপমেন্টের জন্য তৈরি হতে পারবেন।

:::tip জানতে থাকুন

Polygon থেকে সর্বশেষ বিল্ডার আপডেটের সাথে রাখুন সর্বশেষ নোড এবং যাচাইকারীর আপডেটে নজর রাখুন
[<ins>Polygon বিজ্ঞপ্তি গ্রুপ।</ins>](https://polygon.technology/notifications/)

:::

## Polygon-এর মূল ফিচারসমূহ {#key-features-of-polygon}

- **গতি**: পলিগন নেটওয়ার্ক প্রতিটি চেকপয়েন্টে স্টেকহোল্ডারদের দ্বারা নির্বাচিত ব্লক Producers একটি গ্রুপ দ্বারা প্রদত্ত consensus নিয়ে একটি high-throughput ব্লকচেইন ব্যবহার করে। একটি প্রুফ অফ স্ট্যাক লেয়ার ব্যবহার করে ব্লকগুলি যাচাই করা হয় এবং ব্লক প্রডিউসারের প্রমাণগুলি কিছু সময় পর পর Ethereum মেইননেটে পোস্ট করা হয়। এর ফলে ডিসেন্ট্রালাইজেশন নিশ্চিত করার পাশাপাশি মাত্র 2 সেকেন্ডের মধ্যে ব্লক কনফার্ম করা যায় এবং এতে করে নেটওয়ার্কের থ্রুপুট অনেক গুণে বেড়ে যায়।
- **স্ক্যালেবিলিটি**: Polygon নেটওয়ার্ক একটি single একটি সেকেন্ডে 2 সেকেন্ডের কম একটি হাইপোথেটিক্যাল লেনদেনের গতি অর্জন করে। একাধিক সাইডচেইন ব্যবহার করলে নেটওয়ার্কটি প্রতি সেকেন্ডে লক্ষ লক্ষ লেনদেন করতে সক্ষম হবে। এই মেকানিজমটি (প্রথম Matic সাইডচেইনে ইতোমধ্যেই দেখানো হয়েছে) Polygon নেটওয়ার্কটিকে আরো সহজে স্কেল করতে সক্ষম করে তুলে।
- **নিরাপত্তা**: Polygon-এর স্মার্ট চুক্তি Ethereum এর নিরাপত্তার উপর নির্ভর করে। নেটওয়ার্কটিকে সুরক্ষিত রাখতে, এতে তিনটি গুরুত্বপূর্ণ নিরাপত্তা মডেল যোগ করা হয়েছে। এটি Ethereum-এর **স্ট্যাকিং ম্যানেজমেন্ট চুক্তি** এবং **Heimdall** ও **Bor** নোডস চালিয়ে ইনসেনটিভ পাচ্ছে এমন একটি গ্রুপ ব্যবহার করে। ডেভেলাপাররাও তাদের dApp-এ উভয় মডেলই (হাইব্রিড) ব্যবহার করতে পারেন।

## Polygon-এ বিল্ড করা {#building-on-polygon}

আপনি যদি একজন Ethereum ডেভেলপার হন, তাহলে আপনি ইতোমধ্যেই একজন Polygon ডেভেলপার। শুধুমাত্র [Polygon RPC](https://polygon-rpc.com/)-তে সুইচ করে শুরু করে দিন। Ethereum ব্লকচেইনের পরিচিত সকল টুল বাই ডিফল্ট Polygon-এ সমর্থন করে, যেমন Truffle, Remix ও Web3js।

আপনি ডিসেন্ট্রালাইজড অ্যাপ্লিকেশনগুলি চাইলে Polygon মুম্বাই টেস্টনেট বা মেইননেট যেকোনোটিতেই ডিপ্লয় করতে পারেন। Polygon মুম্বাই টেস্টনেট Ethereum Goërli টেস্টনেট-এর সাথে সংযুক্ত থাকে যা এটির প্যারেন্টচেইনের মত কাজ করে। আপনি নেটওয়ার্ক-সম্পর্কিত সবকিছু [নেটওয়ার্ক ডকুমেন্টেশনে](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md) খুঁজে পেতে পারেন।

### ওয়ালেট {#wallets}

Polygon নেটওয়ার্কটির সাথে ইন্টারঅ্যাক্ট করার জন্য, আপনাকে একটি Ethereum-ভিত্তিক ওয়ালেট থাকতে হবে কারণ Polygon Ethereum ভার্চুয়াল মেশিনে (EVM) রান করে। আপনি [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) বা [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) ওয়ালেট সেটআপ করা বেছে নিতে পারেন। wallet-related তথ্যের উপর আরও বেশি এবং আমাদের [ওয়ালেট ডকুমেন্টেশনে](https://docs.polygon.technology/docs/develop/wallets/getting-started) আপনাকে কেন দেখতে হবে।

### স্মার্ট চুক্তি {#smart-contracts}

Polygon অনেক সার্ভিস সমর্থন করে যা ব্যবহার করে আপনি টেস্ট, কম্পাইল, ডিবাগ এবং ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন Polygon নেটওয়ার্কে ডিপ্লয় করতে পারেন। এর মধ্যে [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) এবং [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md) ব্যবহার করে ডিপ্লয় করা অন্তর্ভুক্ত রয়েছে।

### Polygon-এ সংযুক্ত করা {#connecting-to-polygon}

আপনি Polygon-e Metamask যোগ করতে পারেন বা সরাসরি Arkane ব্যবহার করতে পারেন। Arkane দিয়ে আপনি [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) ব্যবহার করে Polygon-এ সংযুক্ত হতে পারেন।

ব্লকচেইন তথ্য রিড করতে Polygon নেটওয়ার্কের সাথে সংযুক্ত করার জন্য, আমরা Alchemy SDK ব্যবহার করার পরামর্শ দিয়ে থাকি।

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Polygon-এ কি নতুন dApp তৈরি করছেন? {#building-a-new-dapp-on-polygon}

ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন (dApps) ব্লকচেইনে ব্যবহারকারীদের এবং তাদের ডেটার গোপনীয়তার মধ্যে একটু সেতু হিসেবে কাজ করে। dApps-এর ক্রমবর্ধমান সংখ্যা ব্লকচেইন ইকোসিস্টেমের মধ্যে তাদের উপযোগিতা যাচাই করছে, স্মার্ট চুক্তিগুলির মাধ্যমে কেন্দ্রীয় কর্তৃপক্ষের প্রয়োজন ছাড়াই দুই অংশগ্রহণকারীদের মধ্যে লেনদেন সম্পাদন করার মতো চ্যালেঞ্জ সমাধান করছে।

মনে করুন আপনার ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন (dApps) তৈরির কোনো পূর্ব অভিজ্ঞতা নেই। সেই ক্ষেত্রে, নিচের উল্লিখিত রিসোর্সগুলি আপনাকে Polygon নেটওয়ার্কে dApps তৈরি, ডিবাগ এবং ডিপ্লয় করার প্রয়োজনীয় টুল দিয়ে সহায়তা করবে।

- [ফুল স্ট্যাক dApp: টিউটোরিয়াল সিরিজ](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Fauna, Polygon এবং React ব্যবহার করে একটি dApp ডেভেলপ করুন](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### আগে থেকেই dApp আছে? {#already-have-a-dapp}

আপনার যদি আগে থেকেই কোনো ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন (dApp) থাকে এবং আপনি তা কম ঝামেলা পোহানোর মাধ্যমে স্কেল করতে চান, তাহলে আপনি সঠিক জায়গাতেই এসেছেন। কারণ Polygon দিয়ে আপনি নিচের কাজগুলি করতে পারেন:

1. **Ethereum ভার্চুয়াল মেশিন (EVM) ভিত্তিক চেইনে সহজেই মাইগ্রেট করতে পারেন**: Polygon Ethereum-এর আল্টিমেট লেয়ার-2 স্কেলিং সলিউশন হিসেবে নিজেকে নিয়ে অনেক গর্ববোধ করে। আপনার dApps EVM-সমর্থিত হলে তা Polygon নেটওয়ার্কে মুভ বা ডিপ্লয় করার সময় অন্তর্নিহিত আর্কিটেকচার নিয়ে চিন্তা করতে হবে না।
2. **দ্রুত লেনদেনের লেয়ার হিসেবে Polygon ব্যবহার করুন**: আপনার dApp Polygon মেইননেটে ডিপ্লয় করে আপনি Polygon-কে আপনার dApp-এর জন্য একটি দ্রুত লেনদেনের লেয়ার হিসেবে ব্যবহার করতে পারেন। তাছাড়া, আমরা আপনার টোকেন ম্যাপ করে দিব। আরো জানতে আপনি Telegram-এ আমাদের [প্রযুক্তিগত আলোচনা গ্রুপে](http://bit.ly/matic-technical-group) যোগ দিতে পারেন।

## সাইড নোট {#side-note}

এইগুলো যদি অনেক বেশি মনে হয়, সমস্যা নেই! আপনি সরাসরি কাজে নেমে পড়তে পারেন ও হ্যাকিং শুরু করতে পারেন। রিসোর্স, রিপোজিটরি এবং ডকুমেন্টগুলিতে দেখা শুরুর আগে কিছু সাইড নোট দেখে নিন:

1. **ব্লিডিং এজ জিনিসপত্র ব্যবহারের খরচের বিষয়ে সতর্ক থাকুন: অন্যান্য প্রথাগত নিশ প্রোগ্রামিং-এর** মতই dApps এবং ব্লকচেইনের ডেভেলাপমেন্ট খুবই দ্রুত এগিয়ে যায়। গবেষণার সময় আপনি জটিল কোড রিপোজিটরি, ডকুমেন্টেশন সাইটে 404 খুঁজে পেতে পারেন বা তাতে কোনো কিছুই না থাকতে পারে। এই সুযোগ কাজে লাগিয়ে আমাদের যেকোনো সামাজিক যোগাযোগ মাধ্যমের চ্যানেলের সাহায্যে আমাদের সাথে যোগাযোগ করুন।
2. **শিখতে গিয়ে কিছুটা কঠিন মনে হতে পারে তবে প্রবেশে বাধা খুবই কম**: কমিউনিটি খুবই বন্ধুত্বপূর্ণ ও সবাই এখানে স্বাগত! প্রজেক্টটি বাইরে কারো পুলের অনুরোধকেও স্বাগতম জানায় এবং সকল ব্লকার সক্রিয়ভাবে সমাধান করার চেষ্টা করে। আমরা বিশ্বকে আরো ভালো করতে সদা কাজ করে যাচ্ছি এবং যেকোনো প্রকারের অবদানের জন্য আমরা কৃতজ্ঞ। আমরা আপনাকে এই অসাধারণ Web3 ইকোসিস্টেমে নিয়ে আসতে পারলে নিজেদের ধন্য মনে করব।

:::info আপডেট থাকুন

ডিসেন্ট্রালাইজড অ্যাপ্লিকেশন ডেভেলপমেন্ট নেটওয়ার্ক ডিসেন্ট্রালাইজেশনকে উৎসাহিত করে। Polygon ইকোসিস্টেম সম্পর্কে আরো ভালোভাবে জানতে ও আপডেট পেতে আমাদের সামাজিক যোগাযোগ মাধ্যমগুলিকে ফলো করুন। আপনি Polygon কমিউনিটির সব লিঙ্ক [এখানে](https://polygon.technology/community/) খুঁজে পেতে পারেন।

:::
