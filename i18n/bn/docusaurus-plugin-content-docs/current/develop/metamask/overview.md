---
id: overview
title: MetaMask-এর সংক্ষিপ্ত বিবরণ
sidebar_label: Overview
description: Polygon-এ MetaMask দিয়ে আপনি কীভাবে শুরু করতে পারেন
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) হলো একটি ক্রিপ্টো ওয়ালেট যা একটি ওয়েব ব্রাউজার এবং মোবাইল ডিভাইসে Ethereum ব্লকচেইনের সাথে ইন্টারঅ্যাক্ট করতে ব্যবহার করা যেতে পারে। এটি আপনাকে একটি সম্পূর্ণ Ethereum নোড না চালিয়েই আপনার ব্রাউজারে Ethereum Dapps (ডিসেন্ট্রালাইজড অ্যাপস চালানোর সুযোগ দেয়।

**প্রকার**: নন-কাস্টোডিয়াল/HD <br/>**প্রাইভেট কী স্টোরেজ**: ব্যবহারকারীর স্থানীয় ব্রাউজার স্টোরেজ <br/>**Ethereum লেজারে যোগাযোগ: **: Infura <br/>**প্রাইভেট কী এনকোডিং**: Mnemonic<br/>

:::warning
দয়া করে আপনার **সিক্রেট রিকভারি ফ্রেজ** ব্যাকআপ করুন। আপনার ডিভাইস ব্রেক থাকলে, হারিয়ে গেলে, চুরি হও, বা ডাটা দুর্নীতি থাকলে, তাহলে এটি পুনরুদ্ধার করার জন্য অন্য কোন উপায় নেই। সিক্রেট রিকভারি ফ্রেজ হল আপনার MetaMask অ্যাকাউন্ট পুনরুদ্ধার করার একমাত্র উপায়। **[<ins>MetaMask জন্য আরও বেসিক নিরাপত্তা এবং সিকিউরিটি টিপ</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)** চেক করুন।
:::

## Polygon জন্য MetaMask সেট আপ করার গাইড {#guide-to-set-up-metamask-for-polygon}

* [MetaMask ডাউনলোড এবং ইনস্টল করুন](/develop/metamask/tutorial-metamask.md)
* [MetaMask-এ Polygon কনফিগার করুন](/develop/metamask/config-polygon-on-metamask.md)
* [কাস্টম টোকেন কনফিগ করুন](/develop/metamask/custom-tokens.md)
* [অ্যাকাউন্ট তৈরি এবং ইম্পোর্ট করুন](/develop/metamask/multiple-accounts.md)

### 1. Web3 সেট আপ করুন {#1-set-up-web3}

#### ধাপ 1 {#step-1}

আপনার DApp-এ নিম্নলিখিতগুলো ইনস্টল করুন:

  ```javascript
  npm install --save web3
  ```

একটি নতুন ফাইল তৈরি করুন, এটির নাম `web3.js` দিন এবং এতে নিম্নলিখিত কোডটি সন্নিবেশ করুন:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

উপরের ফাইলটি `getWeb3()` নামের একটি ফাংশন এক্সপোর্ট করে - যার উদ্দেশ্য হলো Metamask প্রবেশ করানোর মাধ্যমে একটি গ্লোবাল অবজেক্ট (`ethereum` বা `web3`) শনাক্ত করার মাধ্যমে metamask অ্যাকাউন্টে প্রবেশের অনুরোধ করা।

[Metamask-এর API ডকুমেন্টেশন](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes) অনুযায়ী:

> MetaMask window.ethereum এ তার ব্যবহারকারীদের দ্বারা দেখা ওয়েবসাইটগুলিতে একটি গ্লোবাল API ইনজেকশন করে। এই API ওয়েবসাইটটি ব্যবহারকারীদের Ethereum অ্যাকাউন্ট অনুরোধ করতে পারে, ব্যবহারকারী যে ব্লকচেইনের ডেটা পড়তে হবে তা নিশ্চিত করতে পারে এবং ব্যবহারকারী সাইন বার্তা এবং লেনদেনের পরামর্শ দেয়। প্রোভাইডার অবজেক্টের উপস্থিতি একটি Ethereum ব্যবহারকারী নির্দেশ করে।

সহজ শর্তে, এটি মূলত মানে যে আপনার ব্রাউজারে Metamask এর extension/add-on ইনস্টল করা হচ্ছে, আপনার কাছে একটি গ্লোবাল ভেরিয়েবল সংজ্ঞায়িত থাকবে, যা `ethereum`(পুরোনো ভার্শনের `web3`জন্য), এবং আমরা আমাদের web3 অবজেক্টটি instantiate করছি এই ভেরিয়েবল ব্যবহার করে।

#### ধাপ 2 {#step-2}

এখন, আপনার ক্লায়েন্ট কোডে উপরে আপলোড করা ফাইলটি আমদানি করুন:

```js
  import getWeb3 from '/path/to/web3';
```

এবং ফাংশনটি কল করুন:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. অ্যাকাউন্ট সেট আপ করা {#2-set-up-account}

এখন লেনদেনের জন্য (বিশেষত যে যারা ব্লকচেইনের অবস্থা পরিবর্তন করে) আমাদের সেই লেনদেনের সাইন ইন করতে একটি অ্যাকাউন্ট প্রয়োজন হবে। আমরা উপরে তৈরি web3 অবজেক্ট থেকে আমাদের চুক্তি ইন্সটান্ট instantiate করি:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

`getAccounts()` ফাংশনটি ব্যবহারকারীর metamask-এ সকল অ্যাকাউন্টের একটি অ্যারে ফেরত দেয়, এবং `accounts[0]` হলো ব্যবহারকারী কর্তৃক নির্বাচিত।

### 3. আপনার চুক্তির উদাহরণ তৈরি করুন {#3-instantiate-your-contracts}

একবার আমাদের আমাদের `web3`অবজেক্ট থাকলে, আমরা পরবর্তী আমাদের contracts, কিনব, আপনি আপনার contract ABI আছে এবং ইতিমধ্যে স্থানটি ঠিকানা:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. ফাংশন কল করা {#4-call-functions}

এখন আপনার চুক্তির থেকে আপনি যে কোনও ফাংশনের জন্য কল করতে চান, আমরা সরাসরি আমাদের instantiated চুক্তি অবজেক্টের সাথে ইন্টারঅ্যাক্ট করি (যা স্টেপ 2-এ `myContractInstance`declared িত হয়েছে)।

:::tip একটি দ্রুত পর্যালোচনা

চুক্তির রাষ্ট্রটি পরিবর্তন করে এমন কার্যাবলী হল `send()`কার্যাবলী। চুক্তির রাষ্ট্রটি পরিবর্তন না করা কার্যাবলী ফাংশনটি বলা `call()`হয়।

:::

#### `call()` ফাংশন কল করা {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### `send()` ফাংশন কল করা {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
