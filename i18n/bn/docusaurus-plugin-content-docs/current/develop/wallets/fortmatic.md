---
id: fortmatic
title: Fortmatic
description: Polygon দিয়ে আপনার dApp সংহত করতে Formatic SDK ব্যবহার করুন
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Fortmatic SDK আপনাকে সহজেই Ethereum blockchain দিয়ে আপনার dApp সংহত করতে দেয়, কিনা আপনার ইতিমধ্যে Web3 এর সাথে একটি dApp সমন্বিত আছে বা স্ক্র্যাচ থেকে শুরু হচ্ছে। Fortmatic আপনার এবং আপনার বিকেন্দ্রীকৃত অ্যাপ্লিকেশন ব্যবহারকারীদের উভয়ই একটি মসৃণ এবং আনন্দদায়ক অভিজ্ঞতা প্রদান করে।

## ইনস্টলেশন {#installation}

Fortmatic's ওয়ালেট সর্বশেষ সংস্করণ ইনস্টল করতে নিম্নলিখিত কমান্ড ব্যবহার করুন:

```bash
$ npm i --save fortmatic@latest
```

## উদাহরণ {#example}
এখানে using ব্যবহার করে অ্যাপ্লিকেশনের একটি উদাহরণ:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
