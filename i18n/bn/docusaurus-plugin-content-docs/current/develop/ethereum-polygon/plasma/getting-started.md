---
id: getting-started
title: Plasma ব্রিজ
sidebar_label: Introduction
description: Plasma ব্রিজ ও Polygon নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করে।
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

শুরু করতে দয়া করে [Plasma-এর সর্বশেষ MATIC.js ডকুমেন্টেশন](https://maticnetwork.github.io/matic.js/docs/plasma/) দেখুন।

একটি ব্রিজ মূলত অনেকগুলি চুক্তির একটি সমাবেশ যা রুট চেইন থেকে চাইল্ড চেইনে এসেট স্থানান্তর করতে সহায়তা করে। Ethereum ও Polygon-এর মধ্যে এসেট স্থানান্তরের ক্ষেত্রে মূলত দুইটি ব্রিজ রয়েছে। প্রথমটি হচ্ছে Plasma ব্রিজ এবং দ্বিতীয়টি হচ্ছে **PoS ব্রিজ** বা **প্রুফ অফ স্টেক ব্রিজ**। **প্লাজমা ব্রিজ** প্লাজমা প্রস্থান প্রক্রিয়া থেকে বর্ধিত নিরাপত্তা গ্যারান্টি প্রদান করে।

তবে চাইল্ড টোকেনের কিছু সীমাবদ্ধতা রয়েছে এবং Plasma ব্রিজের Polygon থেকে Ethereum-এর সকল এক্সিট/উইথড্রগুলোর ৭ দিনের উইথড্রয়াল পিরিয়ড রয়েছে। [PoS ব্রিজ](/docs/develop/ethereum-polygon/pos/getting-started) অনেক ফ্লেক্সিবল এবং এতে অনেক দ্রুত উইথড্র করা যায়।

এই টিউটোরিয়াল [ম্যাটিক JS](https://github.com/maticnetwork/matic.js) ব্যবহার করে প্লাজমা ব্রিজ বুঝতে এবং ব্যবহার করতে একটি স্টেপ-বাই-স্টেপ গাইড হিসাবে কাজ করবে, যা Polygon নেটওয়ার্কে প্লাজমা ব্রিজের সাথে ইন্টারঅ্যাক্ট করার সবচেয়ে সহজ উপায়।

## Plasma ব্রিজের অ্যাসেট ফ্লো {#assets-flow-in-plasma-bridge}

আমরা এই টিউটোরিয়ালে Polygon-এ অ্যাসেট ট্রান্সফারের ফ্লো দেখাব এবং কীভাবে Matic.js ব্যবহার করে আপনিও তা করতে পারেন তা দেখাব:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. ব্যবহারকারী প্রধান চেইনে Polygon চুক্তিতে ক্রিপ্টো সম্পদ জমা করে
2. একবার জমা করা টোকেন প্রধান চেইনে নিশ্চিত get ে, তাহলে সংশ্লিষ্ট টোকেন Polygon চেইনে প্রতিফলিত হবে
   - ব্যবহারকারীরা এখন নামমাত্র ফি দিয়ে সঙ্গে সঙ্গেই যে কাউকে টোকেন ট্রান্সফার করতে পারবে। Polygon চেইনের ব্লক অনেক দ্রুততর (প্রায় ১ সেকেন্ড)। তাই ট্রান্সফার প্রায় সঙ্গে সঙ্গেই হয়ে যায়।
3. একটি ব্যবহারকারী প্রস্তুত থাকলে, তারা প্রধান চেইনে থেকে অবশিষ্ট টোকেন প্রত্যাহার করতে পারে। Plasma সাইডচেইন থেকে ফান্ড উইথড্র করা শুরু হয়েছে। 5 মিনিটের একটি চেকপয়েন্টের বিরতি সেট করা হয়েছে। আগের চেকপয়েন্টের পরের সব ব্লক সেই সময়ের মধ্যে Polygon ব্লক লেয়ারে ভেলিডেট করা হয়।
4. একবার চেকপয়েন্ট প্রধান চেইনে Ethereum contract, জমা দেও, া Once , একটি প্রস্থান NFT (ERC721) টোকেন সমতুল্য মান তৈরি করা হয়।
5. প্রত্যাহারের ফান্ড একটি process-exit পদ্ধতি ব্যবহার করে প্রধান চেইন কন্ট্রাক্ট থেকে আপনার Ethereum acccount এ ফিরে claimed া যেতে পারে।
   - তাছাড়া, ব্যবহারকারীরা 0x বা ধর্মার (শীঘ্রই আসছে!) মাধ্যমে দ্রুত এক্সিট পেতে পারেন

### পূর্বশর্ত সমূহ: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli ফসেট {#görli-faucet}

টিউটোরিয়াল অনুসরণ করার সময় কোনো লেনদেন করতে আপনার টেস্ট অ্যাকাউন্টে কিছু Ether থাকতে হবে। যদি আপনার Görli-এ কোন ETH না থাকে, তাহলে আপনি এখানে দেওয়া কল লিঙ্ক ব্যবহার করতে পারেন - https://goerli-faucet.slock.it/।

### Polygon ফসেট {#polygon-faucet}

উদাহরণ হিসেবে পুরো টিউটোরিয়ালটি জুড়ে আমরা Görli নেটওয়ার্কে `TEST` ERC20 টোকেন ব্যবহার করব। এটি একটি টেস্ট টোকেন। আপনার DApp-এ, আপনি যেকোনো ERC20 টোকেন দিয়ে এটি প্রতিস্থাপন করতে পারবেন। Polygon নেটওয়ার্কে কিছু `TEST` টেস্ট টোকেন পেতে আপনি [Polygon ফসেট](https://faucet.polygon.technology/) অ্যাক্সেস করতে পারেন।

:::note

ডিপোজিট এবং উত্তোলনের জন্য আপনার নিজের টোকেন ব্যবহার করতে, আপনাকে টোকেন 'mapped' পেতে হবে, যা মূলত মূল চেইনে চুক্তি তৈরি করে এবং আপনার কাস্টম টোকেনের 'aware' sidechain পরিণত করে।

:::

### Metamask ওয়ালেটের বেসিক সেটআপ (ঐচ্ছিক) {#basic-setup-for-the-metamask-wallet-optional}

1. [একটি মানিব্যাগ তৈরি করুন](/docs/develop/metamask/hello): আপনি যদি মানিব্যাগে নতুন হন, তাহলে একটি MetaMask Account সেট করুন।
2. [Polygon the কনফিগার করুন: Polygon](/docs/develop/metamask/config-polygon-on-metamask) এ সহজেই of া দেখতে পাবেন, তাহলে আপনি Metamask এ Polygon the কনফিগার করতে পারবেন তাহলে এটি নির্দেশক। মনে রাখবেন আমরা শুধু দেখার সুবিধার জন্য Metamask ব্যবহার করছি। Polygon ব্যবহার করার জন্য Metamask ব্যবহার করার কোনোই বাধ্যবাধকতা নেই।
3. [একাধিক অ্যাকাউন্ট তৈরি করুন](/docs/develop/metamask/multiple-accounts): টিউটোরিয়াল শুরু করার আগে 3টি Ethereum টেস্ট অ্যাকাউন্ট প্রস্তুত করুন।
4. [Polygon-এ টোকেন কনফিগার করুন](/docs/develop/metamask/custom-tokens): Matic.js ব্যবহার করে Polygon-এ সহজেই ফান্ডের ফ্লো দেখতে চাইলে আপনি Metamask কনফিগার করে নিতে পারেন।
এই টিউটোরিয়ালটির জন্য একটি উদাহরণ হিসাবে গ্রহণ করা `TEST`টোকেনটি MetaMask এ কনফিগার করা যেতে পারে যাতে সহজেই অ্যাকাউন্ট ব্যালেন্স দেখতে পারেন। আবার নোট করুন এই **ঐচ্ছিক।** আপনি খুব সহজেই [web3.js](https://web3js.readthedocs.io/en/1.0/) ব্যবহার করে টোকেন ব্যালেন্স এবং অন্যান্য ভেরিয়েবল প্রশ্নের উত্তর দিতে পারেন।
