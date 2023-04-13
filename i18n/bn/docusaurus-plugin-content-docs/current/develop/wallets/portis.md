---
id: portis
title: Portis
description: সহজ নিবন্ধনকে বিবেচনায় রেখে নির্মিত একটি ওয়েব-ভিত্তিক ওয়ালেট।
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis একটি ওয়েব-ভিত্তিক ওয়ালেট যা সহজ নিবন্ধনকে বিবেচনায় রেখে নির্মিত হয়েছে। এটির সাথে একটি javascript SDK রয়েছে যা DApp-এ যোগ করা যায় এবং ব্যবহারকারীদের জন্য একটি লোকাল ওয়ালেট-বিহীন অভিজ্ঞতা তৈরি করে। উপরন্তু, এটি ওয়ালেট, লেনদেনের এবং গ্যাস ফি সেট আপ করার জন্য পরিচালনা করে।

Metamask-এর মত এটিও নন-কাস্টোডিয়াল - ব্যবহারকারীরা তাদের কীগুলি নিয়ন্ত্রণ করে। Portis শুধু সেগুলো নিরাপদে সংরক্ষণ করে। তবে Metamask-এর মত ব্রাউজারে ইন্টিগ্রেট না করে এতি সরাসরি অ্যাপে ইন্টিগ্রেট করে। ব্যবহারকারীদের তাদের লগইন আইডি এবং পাসওয়ার্ডের সাথে সম্পর্কিত কী রয়েছে।

**প্রকার**: নন-কাস্টোডিয়াল/HD <br/>
**প্রাইভেট কী স্টোরেজ**: Portis সার্ভারে এনক্রিপ্ট করা এবং সংরক্ষণ করা<br/> **Ethereum to যোগাযোগ করুন**: ডেভেলপার দ্বারা সংজ্ঞায়িত<br/> **প্রাইভেট কী এনকো**: Mnemonic<br/>

## Web3 সেট আপ করুন {#set-up-web3}

আপনার dApp-এ Portis ইনস্টল করুন:

```js
npm install --save @portis/web3
```

এখন, [Portis ড্যাশবোর্ডে](https://dashboard.portis.io/) ব্যবহার করে একটি dApp ID পাওয়ার জন্য Portis দিয়ে আপনার dApp রেজিস্টার করুন।

আমদানি `portis`এবং `web3`অবজেক্ট:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Portis কনস্ট্রাক্টর dApp ID হিসাবে প্রথম আর্গুমেন্ট নেয় এবং আপনি যে নেটওয়ার্কে সংযোগ করতে চান তা হিসাবে দ্বিতীয় আর্গুমেন্ট গ্রহণ করে। এটি হয় একটি স্ট্রিং নাহয় একটি অবজেক্ট হতে পারবে।

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## অ্যাকাউন্ট সেট আপ করুন {#set-up-account}

যদি web3 এর ইনস্টলেশন এবং ইনস্টেন্সিয়েশন সফল হয়, তাহলে সংযুক্ত অ্যাকাউন্টে নিম্নলিখিতগুলি সফলভাবে ফিরে আসবে বলে মনে করা হচ্ছে:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Contracts Instantiating {#instantiating-contracts}

এই is ে আমরা কিভাবে চুক্তি instantiate করতে পারি:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## কলিং ফাংশন {#calling-functions}

### কলিং `call()`ফাংশন {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### কলিং `send()`ফাংশন {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
