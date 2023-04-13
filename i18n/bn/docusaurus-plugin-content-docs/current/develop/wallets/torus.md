---
id: torus
title: টোরাস
description: টরাস dApps এর জন্য একটি নন-কাস্টোডিয়াল কী ম্যানেজমেন্ট সিস্টেম।
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

টরাস হচ্ছে বিকেন্দ্রীকৃত অ্যাপ্লিকেশনের জন্য একটি ব্যবহারকারী-বান্ধব, নিরাপদ এবং non-custodial কী ম্যানেজমেন্ট সিস্টেম। আমরা মূলধারার ব্যবহারকারীদের ডিসেন্ট্রালাইজড ইকোসিস্টেমের একটি গেটওয়ে প্রদান করতে দৃঢ় প্রতীজ্ঞ।

**প্রকার**: নন-কাস্টোডিয়াল / এইচডি<br/> **প্রাইভেট কী স্টোরেজ**: টরাস সার্ভারে ব্যবহারকারীর স্থানীয় ব্রাউজার স্টোরেজ / এনক্রিপ্ট করা এবং সংরক্ষণ করা<br/> **Ethereum লেজারে যোগাযোগ: **: Infura <br/>
**প্রাইভেট কী এনকোডিং**: Mnemonic / Social-Auth-login<br/>

আপনার অ্যাপ্লিকেশনের প্রয়োজনের উপর নির্ভর করে, Torus টোরাস ওয়ালেটটির মাধ্যমে একত্রিত হতে পারে, অথবা the মাধ্যমে টোরাস নেটওয়ার্কের সাথে সরাসরি ইন্টারঅ্যাক্ট করা যেতে পারে। আরও তথ্যের জন্য, [টরাস ডকুমেন্টেশন](https://docs.tor.us/) দেখুন।

## টোরাস ওয়ালেট ইন্টিগ্রেশন {#torus-wallet-integration}

আপনার অ্যাপ্লিকেশন যদি ইতিমধ্যে MetaMask বা অন্য কোন ওয়েব3 প্রোভাইডারের সাথে সামঞ্জস্যপূর্ণ is তাহলে টরাস ওয়ালেট একীভূত হলে আপনাকে একই ওয়েব3 ইন্টারফেস মোড়ানো একটি প্রোভাইডার দিবে। আপনি একটি npm প্যাকেজের মাধ্যমে ইনস্টল করতে পারেন। আরও বেশি উপায় এবং গভীরতার তথ্যের জন্য, অনুগ্রহ করে [ওয়ালেট ইন্টিগ্রেশন](https://docs.tor.us/wallet/get-started) এ অফিসিয়াল টোরাস ডকুমেন্টেশন দেখুন।

### ইনস্টলেশন {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### উদাহরণ {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## CustomAuth ইন্টিগ্রেশন {#customauth-integration}

আপনি যদি প্রত্যেক ইন্টারঅ্যাকশনে লগইন থেকে আপনার নিজস্ব UX-কে নিয়ন্ত্রণ করতে চান তবে আপনি use ব্যবহার করতে পারেন। আপনি আপনার তৈরি করা প্ল্যাটফর্মের উপর নির্ভর করে তাদের SDKs একটির মাধ্যমে আপনি সংহত করতে পারেন। আরও তথ্যের জন্য, দয়া করে [Torus CustomAuth ইন্টিগ্রেশন](https://docs.tor.us/customauth/get-started) দেখুন।
