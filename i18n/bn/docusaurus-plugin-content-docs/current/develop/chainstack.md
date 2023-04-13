---
id: chainstack
title: Chainstack এবং ফাউন্ড্রি ব্যবহার করে একটি স্মার্ট চুক্তি স্থাপন করুন
sidebar_label: Using Chainstack
description:  Polygon এ একটি স্মার্ট কন্ট্রাক তৈরি করতে Chainstack এবং Foundry ব্যবহার করুন
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## সংক্ষিপ্ত বিবরণ {#overview}

এই বিভাগে Polygon Mumbai testnet-এ [Chainstack](https://chainstack.com/build-better-with-polygon/) এবং [Foundry](https://github.com/gakonst/foundry/) ব্যবহার করে একটি হ্যালো ওয়ার্ল্ড চুক্তি deploying মাধ্যমে আপনাকে গাইড করে।

Chainstack Ethereum-ভিত্তিক অ্যাপ্লিকেশন এবং অন্যান্য for জন্য অবকাঠামো সরবরাহ করে। তারা নোড বজায় রাখে এবং নেটওয়ার্কের সাথে তাদের সংযোগ নিশ্চিত করে এবং মেইননেট এবং with সাথে ইন্টারঅ্যাক্ট করতে একটি ইন্টারফেস অফার করে।

ফাউন্ড্রি হলো Ethereum অ্যাপ্লিকেশন তৈরির জন্য একটি দ্রুত টুলকিট, যা Rust দিয়ে লেখা। এটি পরীক্ষার জন্য উপলব্ধ, EVM স্মার্ট কন্ট্র্যাক্ট সহ ইন্টারঅ্যাকশন এবং লেনদেনের পাঠানো, এবং ব্লকচেইন ডাটা retrieval.

:::tip

আপনার যদি কোন প্রশ্ন থাকে, তাহলে [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) সার্ভারে পৌঁছ.

:::

## আপনি কী শিখবেন {#what-you-will-learn}

একটি হ্যালো ওয়ার্ল্ড চুক্তি তৈরি করুন, Polygon নোড ডিপ্লয় করতে চেইনস্ট্যাক এবং চুক্তিটি ডিপ্লয় করতে ফাউন্ড্রি ব্যবহার করুন।

## আপনি কী করবেন {#what-you-will-do}

1. চেইনস্ট্যাক ব্যবহার করে একটি Polygon নোড ডিপ্লয় করুন
2. ফাউন্ড্রি সেটআপ করুন
3. স্মার্ট চুক্তি তৈরি করুন
4. স্মার্ট চুক্তি ডিপ্লয় করুন।

## একটি Polygon মুম্বাই নোড ডিপ্লয় করুন {#deploy-a-polygon-mumbai-node}

আপনাকে ব্লকচেইন নেটওয়ার্কে একটি স্মার্ট চুক্তি deploy  করতে একটি নোড দরকার। আপনার নোড আপ এবং চলমান পেতে নীচের পদক্ষেপটি অনুসরণ করুন:

**ধাপ 1 →** [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**ধাপ 2 →** [একটি মুম্বাই নোড কীভাবে deploy](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)  করবেন তার the অনুসরণ করুন

![img](/img/chainstack/join-network.png)

**ধাপ 3 →** [মোতায়েন নোডের HTTPS এন্ডপয়েন্ট](https://docs.chainstack.com/platform/view-node-access-and-credentials) পান

## ফাউন্ড্রি ইনস্টল করুন {#install-foundry}

ফাউন্ড্রি হলো একটি ডেভেলপমেন্ট টুলকিট যা স্মার্ট চুক্তি দিয়ে কাজ করে। এটি দিয়ে শুরু করার জন্য, আপনাকে প্রথমে Rust কোডিং ভাষা ইনস্টল করতে হবে।

1. [Rust ইনস্টল করুন](https://www.rust-lang.org/tools/install)।
1. [ফাউন্ড্রি ইনস্টল করুন](https://github.com/gakonst/foundry/)।

## ফাউন্ড্রি দিয়ে শুরু করুন {#initialize-with-foundry}

একটি বয়লারপ্লেট প্রজেক্ট তৈরি করার জন্য, আপনার কাজের ডিরেক্টরিতে ন্যাভিগেট করুন এবং রান করুন:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## আপনার অ্যাকাউন্টে অর্থ যোগ করুন {#fund-your-account}

স্মার্ট চুক্তি ডিপ্লয় করার জন্য আপনার একটি ওয়ালেট অ্যাকাউন্ট প্রয়োজন হবে। আপনি যে জন্য [Metamask](https://metamask.io/) ব্যবহার করতে পারেন। চুক্তিটি ডিপ্লয় করার জন্য আপনাকে নেটওয়ার্কে গ্যাসও দিতে হবে। শুধু আপনার ওয়ালেট ঠিকানা কপি করুন এবং [কল মাধ্যমে](https://faucet.polygon.technology/) মুম্বাই ম্যাটিক টোকেন পাবেন।

## Hello World চুক্তি তৈরি করুন {#create-the-hello-world-contract}

`src/`-এ সৃষ্ট হওয়া প্রজেক্টে, `HelloWorld.sol` তৈরি করুন:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## চুক্তি ডিপ্লয় করুন {#deploy-the-contract}

এখন আপনি আপনার চুক্তি ডিপ্লয় করার জন্য প্রস্তুত:

* Polygon মুম্বাই নেটওয়ার্কে আপনার নিজের নোড রয়েছে, যার মাধ্যমে আপনি চুক্তিটি ডিপ্লয় করবেন।
* আপনার কাছে ফাউন্ড্রি রয়েছে যা আপনি চুক্তি ডিপ্লয় করার জন্য ব্যবহার করবেন।
* আপনার একটি অর্থ যোগ করা অ্যাকাউন্ট রয়েছে যা চুক্তি ডিপ্লয় করবে।

চুক্তিটি ডিপ্লয় করার জন্য, রান করুন:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

এখানে,

* ContrACT_PATH — আপনার `HelloWorld.sol` ফাইলের পথ।
* PRIVATE_KEY — আপনার অ্যাকাউন্টের ব্যক্তিগত কী।
* HTTPS_ENDPOINT — [আপনার নোডের এন্ডপয়েন্ট](https://docs.chainstack.com/platform/view-node-access-and-credentials)।

উদাহরণ:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

আপনি শেষ ধাপ থেকে সৃষ্ট নতুন হ্যাশ ব্যবহার করে যেকোনো সময় মুম্বাই [<ins>Polygonscan</ins>](https://mumbai.polygonscan.com/)-এ চুক্তিটির ডিপ্লয়মেন্ট চেক করতে পারবেন।

:::

## চুক্তিটি পরীক্ষা করুন {#test-the-contract}

চুক্তিটি সঠিকভাবে কাজ করছে কিনা তা পরীক্ষা করার জন্য একটি `forge test` কমান্ড রয়েছে। আরো সুনির্দিষ্ট পরীক্ষার জন্য ফাউন্ড্রি অনেক [বিকল্প](https://book.getfoundry.sh/reference/forge/forge-test) (ফ্ল্যাগ) প্রদান করে। [ফাউন্ড্রির ডকুমেন্টেশন](https://book.getfoundry.sh/forge/tests) থেকে টেস্ট লেখা, আরো অগ্রগামী পরীক্ষা করা এবং অন্যান্য ফিচার সম্পর্কে আরো জেনে নিন।

**অভিনন্দন! আপনি Polygon-এ আপনার Hello World স্মার্ট চুক্তি মোতায়েন করেছেন।**

Polygon-সম্পর্কিত আরো [<ins>টিউটোরিয়াল</ins>](https://docs.chainstack.com/tutorials/polygon/) এবং [<ins> টুলসের</ins>](https://docs.chainstack.com/operations/polygon/tools) জন্য চেইনস্ট্যাক docs-ও দেখুন।
