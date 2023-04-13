---
id: replit
title: Replit ব্যবহার করে একটি স্মার্ট কন্ট্রাক স্থাপন করুন
sidebar_label: Using Replit
description: Polygon এ ReplitIDE ব্যবহার করে স্মার্ট Contracts স্থাপন করুন
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## সংক্ষিপ্ত বিবরণ {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) হচ্ছে একটি কোডিং প্ল্যাটফর্ম যেখানে আপনি কোড লিখতে এবং আপনার অ্যাপ হোস্ট করতে পারবেন। [Replit Solidity প্রোগ্রামিং ভাষা](https://replit.com/@replit/Solidity-starter-beta?v=1) সমর্থন করে। সুতরাং এটি Web3 ডেভেলপারদের স্মার্ট চুক্তি তৈরি এবং ডিপ্লয় করার সকল ফিচার ও ফাংশনালিটির সুবিধা প্রদান করে থাকে।

এই নিবন্ধটি আপনাকে [Replit IDE](https://replit.com/signup) এবং [Replit Solidity ডেভেলপমেন্ট টেমপ্লেট (Solidity স্টার্টার বিটা)](https://replit.com/@replit/Solidity-starter-beta?v=1) ব্যবহার করে Polygon এ একটি সলিডিটি স্মার্ট চুক্তি তৈরি এবং deploy  করতে গাইড করে।

## আপনি কী করবেন {#what-you-will-do}

- একটি Replit অ্যাকাউন্ট তৈরি করুন
- একটি Repl এনভায়রনমেন্ট তৈরি করুন
- Polygon মুম্বাই নেটওয়ার্কে একটি নমুনা প্রকল্প স্থাপন করুন
- চুক্তিটি যাচাই করুন
- আপনার প্রজেক্টটি একটি ব্যক্তিগত Replit প্রোফাইলে পাবলিশ করুন।

:::tip

Replit, সহ সলিডিটি সম্পর্কে অতিরিক্ত উদাহরণের জন্য, আপনি <ins>**[read দিয়ে শুরু করুন](https://blog.replit.com/solidity)**</ins> বা <ins>**[Replit সলিডিটি ডকুমেন্টেশন এবং এসক্রো চুক্তি টিউটোরিয়াল](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins> চেক করতে পারেন।
:::

## পূর্বশর্ত {#prerequisites}

আপনাকে Replit ব্যবহার করে Polygon এ আপনার সলিডিটি স্মার্ট চুক্তি deploy ে যেকোনো লোকাল এনভায়রনমেন্ট সেটআপ প্রয়োজন নেই।

Polygon মুম্বাই টেস্টনেটের সাথে ইন্টারঅ্যাক্ট করতে এবং চুক্তিগুলি ডিপ্লয় করতে আপনার শুধু একটি ব্রাউজার-ভিত্তিক ওয়েব3 ওয়ালেট প্রয়োজন হবে। আপনি যদি আগে থেকেই MetaMask ব্যবহার করে থাকেন, তাহলে Replit পরীক্ষার জন্য নতুন একটি অ্যাকাউন্ট তৈরি করে নিন। আপনি তা অ্যাকাউন্ট মেনু থেকে করতে পারবেন, যা MetaMask ইন্টারফেসের উপরের ডান কোণার অ্যাকাউন্ট অ্যাভাটারের উপর ক্লিক করলে দেখা যায়।

Polygon-এ আপনার সলিডিটি স্মার্ট চুক্তি ডিপ্লয় করতে আপনাকে অবশ্যই নিম্নলিখিত পূর্বশর্তগুলি পূরণ করতে হবে:

1. [একটি Replit অ্যাকাউন্ট তৈরি করুন](https://replit.com/signup)
2. [Metamask ওয়ালেট ডাউনলোড করুন](/docs/develop/metamask/hello)
3. [MetaMask-এ Polygon কনফিগার করুন](/docs/develop/metamask/config-polygon-on-metamask)
4. [testnet টোকেন নিন](https://faucet.polygon.technology)

## Repl-এর সাথে কাজ করা {#working-with-a-repl}

আপনার তৈরি করা Repl-এর সবগুলোই সম্পূর্ণ কার্যকরী ডেভেলাপমেন্ট ও প্রোডাকশন এনভায়রনমেন্ট। একটি সলিডিটি স্টার্টার Replit তৈরি করতে নিচের পদক্ষেপগুলি অনুসরণ করুন:

1. [লগিন](https://replit.com/login) বা [একটি অ্যাকাউন্ট তৈরি করুন](https://replit.com/signup)। আপনার [Replit অ্যাকাউন্ট](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) তৈরি করার পরে, আপনার হোম স্ক্রিনে একটি ড্যাশবোর্ড অন্তর্ভুক্ত হবে যেখানে আপনি দেখতে পাবেন, প্রকল্প তৈরি করতে পারবেন এবং আপনার অ্যাকাউন্ট পরিচালনা করুন।

![img](/img/replit/dashboard.png)

2. একবার লগ ইন করলে, একটি Solidity স্টার্টার উত্তর তৈরি করুন, Select ে **+ রিপল করুন** বাম প্যানেল বা **+** থেকে স্ক্রিনের উপরের ডান কোণে থেকে ।

![img](/img/replit/solidity.png)

3. [**Solidity স্টার্টার (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) টেমপ্লেট নির্বাচন করুন এবং আপনার প্রকল্পটি একটি শিরোনাম দিন।

4. আপনার প্রকল্প তৈরি করতে **+ Create Repl** এ ক্লিক করুন।

:::note

Solidity স্টার্টার repl একটি browser-friendly ইন্টারফেসের সাথে আসে, যা <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> ব্যবহার করে তৈরি করা হয়েছে, যা আপনি আমাদের with সাথে deploy  এবং ইন্টারঅ্যাক্ট করতে ব্যবহার করতে পারেন। আমরা Replit এর testnet-এ deploy  করব, Replit দ্বারা পরিচালিত Ethereum blockchain এর একটি কাস্টম সংস্করণ এবং পরীক্ষার জন্য অপ্টিমাইজ করা হবে।

:::

## Polygon-এ ডিপ্লয় করুন {#deploy-on-polygon}

নিশ্চিত Make ে নিন যে আপনি উপরে **পূর্বশর্ত** তালিকা অনুসরণ করেছেন যাতে আপনি আপনার স্মার্ট কন্ট্রাক্ট deploy ে এবং ইন্টারঅ্যাক্ট করতে প্রস্তুত আছেন।

1. সকল প্রাসঙ্গিক প্যাকেজ ইনস্টল করতে **Run** (শীর্ষক on ক্লিক করুন এবং চুক্তি deployment মেন্ট UI শুরু করুন।

2. আপনার MetaMask ওয়ালেটটি ওয়েব ইন্টারফেসে সংযুক্ত করুন এবং [মুম্বাই](docs/develop/metamask/config-polygon-on-metamask) Testnet-এ স্যুইচ করুন।

![img](/img/replit/connect.png)

3. **Connect on ওয়ালেটে** ক্লিক করুন, আপনার অ্যাকাউন্ট নির্বাচন করুন, তারপর **Connect** চয়ন করুন।

![img](/img/replit/deploy-list.png)

4. ড্রপডাউন তালিকা থেকে, আপনি যে চুক্তি স্থাপন করতে চান তা নির্বাচন করুন। **on** ে ক্লিক করুন।

5. আপনি আপনার নিশ্চিতকরণের জন্য জিজ্ঞাসা একটি MetaMask popup উইন্ডো পাবেন। আপনার কন্ট্রাক্ট deploy ে আপনার ওয়ালেটটি থেকে লেনদেনটি অনুমোদন করুন।

## আপনার চুক্তি যাচাই এবং পরীক্ষা করা {#verifying-and-testing-your-contract}

চুক্তিটি ডিপ্লয় করা হলে, আপনার অ্যাকাউন্ট সার্চ করতে, ডিপ্লয় করা চুক্তি দেখতে এবং আপনার অ্যাকাউন্টের ঠিকানা কপি করতে [Polyganscan](https://mumbai.polygonscan.com/)-এ যান।

আপনার চুক্তি একবার deployed, করা Once ে, এটি ড্রপডাউন বক্সের নিচে এক্সপেন্ডেবল বক্স হিসাবে প্রদর্শিত হবে। সেটি প্রসারিত করুন এবং উপলভ্য সকল ফাংশন দেখুন। আপনি এখন প্রদত্ত ইউজার ইন্টারফেস ব্যবহার করে বা ইন্টারফেসে দেখানো শেয়ারযোগ্য URL থেকে আপনি আপনার চুক্তির সাথে ইন্টারঅ্যাক্ট করতে পারেন।

## Replit-এ পাবলিশ করুন​ {#publish-to-replit}

Replit দিয়ে আপনি আপনার প্রজেক্টগুলি আপনার ব্যক্তিগত প্রোফাইলে পাবলিশ করতে পারেন। পাবলিশ করা পর, অন্যদের এক্সপ্লোর, ইন্টারঅ্যাক্ট, ক্লোন এবং কোলাবোরেট করতে প্রজেক্টগুলি আপনার স্পটলাইট পৃষ্ঠায় দেখা যাবে।

আপনার প্রকল্প Replit: প্রকাশ করার জন্য নীচের পদক্ষেপটি অনুসরণ করুন:

1. স্ক্রিনের উপরের দিক থেকে প্রজেক্টের শিরোনাম নির্বাচন করুন।
2. আপনার প্রকল্পের নাম এবং বর্ণনা সম্পূর্ণ করুন এবং **Publish** ক্লিক করুন।
