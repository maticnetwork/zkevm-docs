---
id: getting-started
title: Matic.js দিয়ে শুরু করা
sidebar_label: Instantiating Matic.js
description: "Polygon PoS চেইনের সাথে ইন্টারঅ্যাক্ট করতে MATIC.js ব্যবহার করুন।"
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

শুরু করতে সর্বশেষ  [Matic.js ডকুমেন্টেশন](/docs/develop/ethereum-polygon/matic-js/get-started) দেখুন।

## ক্ষুদ্র সারাংশ {#quick-summary}

matic.js SDK Polygon এর সকল কম্পিউটিং শক্তি গ্রহণ করে এবং আপনার আঙুল টিপে এটি রাখে। কাস্টম-তৈরি ফাংশনগুলির সাথে যা অনুমোদন, জমা এবং উত্তোলনের অনুমতি দেয়, খুব বেশি ফুটওয়ার্ক না করেই। আমাদের প্ল্যাটফর্ম থেকে আপনি তাত্ক্ষণিক মান পেতে নিশ্চিত করার জন্য এটি আমাদের কারণ ছিল।

## ইনস্টলেশন {#installation}
আমাদের SDK এর মাধ্যমে Polygon এর সন্ত্রস্ত শক্তি ব্যবহার করার প্রথম পদক্ষেপটি হচ্ছে এর একটি NPM ইনস্টল [করে](https://www.npmjs.com/package/@maticnetwork/maticjs)। এখানে খুঁজুন।

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## ব্যবহার {#usage}
SDK অ্যাক্সেস করতে, ব্যবহার করে আপনার অ্যাপ্লিকেশনে এটি আমদানি করুন
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

providers providers প্রয়োজন উপর ভিত্তি করে RPC URL বা web3-based provider হতে পারে।

আরো তথ্যের জন্য, [PoS এ MATIC.js ডকুমেন্টেশন](https://maticnetwork.github.io/matic.js/docs/pos/) এ অনুগ্রহ করে একটি নজর দিন।

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient();

await posClient.init({
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
