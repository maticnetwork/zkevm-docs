---
id: walletconnect
title: WalletConnect
description: একটি উন্মুক্ত প্রোটোকল যা একটি DApp-Wallet যোগাযোগ তৈরি করে।
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** একটি ওপেন প্রোটোকল - না একটি ওয়ালেট - dApps এবং wallets মধ্যে একটি যোগাযোগ লিঙ্ক তৈরি করতে নির্মিত নয়। এই প্রোটোকল সমর্থনকারী একটি ওয়ালেট এবং একটি অ্যাপ্লিকেশন যে কোনও দুই পিয়ারের মধ্যে একটি ভাগ কী এর মাধ্যমে একটি নিরাপদ লিঙ্ক সক্ষম করবে। স্ট্যান্ডার্ড WalletConnect URI সহ একটি QR কোড দেখানো DApp দিয়ে একং সংযোগ শুরু করা হয়েছে এবং ওয়ালেট অ্যাপ্লিকেশনটি সংযোগের অনুরোধ অনুমোদন করার পরে সংযোগ স্থাপন করা করা হবে। ফান্ড ট্রান্সফার সংক্রান্ত আরো অনুরোধ থাকলে তা ওয়ালেট অ্যাপ্লিকেশনেই কনফার্ম করা হয়।

## Web3 সেট আপ করুন {#set-up-web3}

একটি ব্যবহারকারীর পলিগন with সাথে সংযোগ করতে আপনার dApp সেট আপ করতে, আপনি সরাসরি Polygon এর সাথে সংযোগ করতে WalletConnect’s এর প্রোভাইডার ব্যবহার করতে পারেন। আপনার DApp-এ নিম্নলিখিতগুলো ইনস্টল করুন:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Polygon ইন্টিগ্রেশন `matic.js`জন্য ইনস্টল করুন:

```bash
$ npm install @maticnetwork/maticjs
```

এবং আপনার dApp-এ নিম্নলিখিত কোড যোগ করুন;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

পরবর্তী, WalletConnect’s অবজেক্টের মাধ্যমে Polygon এবং Ropsten প্রদানকারী সেট আপ করুন:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

আমরা উপরের দুটি সরবরাহকারী অবজেক্ট তৈরি করেছি যাতে আমাদের Web3 অবজেক্ট ইনস্টেন্সিয়েট করতে পারি:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Contracts Instantiating {#instantiating-contracts}

একবার আমাদের **ওয়েব3 অবজেক্ট** থাকলে, চুক্তির instantiating মেটামাস্কের মতো একই পদক্ষেপ নিয়ে থাকে। নিশ্চিত Make ে নিন যে আপনার আপনার **চুক্তি ABI** এবং ইতিমধ্যে **ঠিকানাটি** আছে।

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## কলিং ফাংশন {#calling-functions}

:::info

প্রাইভেট কী ব্যবহারকারীর ওয়ালেটে থাকবে এবং **অ্যাপটি যে কোন ভাবেই এটি অ্যাক্সেস করে না।**

:::

ব্লকচেইনের সাথে মিথস্ক্রিয়া নির্ভর করে, আমাদের Ethereum-এ দুটি ধরনের ফাংশন আছে। আমরা ডেটা রিড করতে `send()` করি এবং ডেটা রাইট করতে `call()` পাঠাই।

### `call()` ফাংশন কল করা {#functions}

ডেটা পড়ার প্রয়োজন হয় না, তাই কোডটি এই মত হতে হবে:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### `send()` ফাংশন কল করা {#functions-1}

যেহেতু ব্লকচেইনে লিখে একটি স্বাক্ষর প্রয়োজন, তাই আমরা লেনদেনের জন্য তাদের ওয়ালেটে (যা WalleTConnect সমর্থন করে) ব্যবহারকারীকে অনুরোধ করি।

এতে তিনটি পদক্ষেপ রয়েছে:
1. একটি লেনদেন তৈরি করা
2. লেনদেনে একটি স্বাক্ষর নেয়া
3. স্বাক্ষরিত লেনদেন পাঠানো

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

উপরের কোডটি একটি লেনদেনের অবজেক্ট তৈরি করে যা পরে স্বাক্ষরের জন্য ব্যবহারকারীর ওয়ালেটে পাঠানো হয়:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`ফাংশন তাদের স্বাক্ষরতার জন্য ব্যবহারকারীকে prompts এবং স্বাক্ষরিত লেনদেনের জন্য `sendSignedTransaction()`পাঠা.  (সাফল্যের জন্য একটি লেনদেনের receipt া ফেরত পাঠা))।
