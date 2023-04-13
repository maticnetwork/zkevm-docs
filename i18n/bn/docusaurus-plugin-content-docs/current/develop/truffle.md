---
id: truffle
title: Truffle ব্যবহার করে একটি স্মার্ট কন্ট্রাক স্থাপন করুন
sidebar_label: Using Truffle
description:  Polygon এ একটি স্মার্ট কন্ট্রাক deploy  করতে Truffle ব্যবহার করুন
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## সংক্ষিপ্ত বিবরণ {#overview}

[ট্রাফল](https://trufflesuite.com/) একটি ব্লকচেইন ডেভেলপমেন্ট environment, যা আপনি Ethereum Virtual Machine ব্যবহার করে স্মার্ট চুক্তি তৈরি এবং পরীক্ষা করতে পারেন। এই গাইডটি হচ্ছে Truffle ব্যবহার করে একটি স্মার্ট চুক্তি তৈরি করতে এবং EVM-compatible  Polygon নেটওয়ার্কে এটি deploying কিভাবে তা করতে হবে তা শিক্ষা দি. ।

:::note

এই টিউটোরিয়াল [<ins>হল Truffle quickstart গাইড</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) নিবন্ধটির একটি অভিযোজিত সংস্করণ।

:::

## আপনি কী করবেন {#what-you-will-do}

- Truffle ইনস্টল এবং সেট আপ করুন
- Polygon নেটওয়ার্কে চুক্তি Deploy  করুন
- Polygonscan এ deployment মেন্ট স্ট্যাটাস চেক করুন

## পূর্বশর্ত {#prerequisites}

শুরু করার আগে কিছু কারিগরি পূর্বশর্ত রয়েছে। অনুগ্রহ করে নিম্নলিখিত বিষয়গুলো ইনস্টল করুন:

- [Node.js v8+ LTS এবং npm](https://nodejs.org/en/) (Node দিয়ে প্যাকেজ করা হয়েছে)
- [Git](https://git-scm.com/)

আমাদের সেগুলো ইনস্টল করার পরে, Truffle ইনস্টল করার জন্য আমাদের শুধুমাত্র একটি কমান্ড দরকার হয়:

```
npm install -g truffle
```

ট্রাফলে সঠিকভাবে ইনস্টল করা To ে যাচাই করতে, একটি `truffle version`টার্মিনালে টাইপ করুন। আপনি যদি একটি ত্রুটি দেখতে পান, তাহলে নিশ্চিত করুন যে npm মডিউলটি আপনার পাতায় যোগ করা হবে।

## কোনো প্রজেক্ট তৈরি করা {#creating-a-project}

### MetaCoin প্রজেক্ট {#metacoin-project}

আমরা Truffle-এর একটি boilerplates ব্যবহার করব, যা আপনি তাদের [Truffle বক্স](https://trufflesuite.com/boxes/) পেজে পাবেন। [MetaCoin বক্স](https://trufflesuite.com/boxes/metacoin/) এমন একটি টোকেন তৈরি করে যা এক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টের মধ্যে ট্রান্সফার করা যাবে।

1. এই Truffle প্রজেক্টের জন্য একটি নতুন ডিরেক্টরি তৈরি করে শুরু করুন:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. MetaCoin বক্স ডাউনলোড করুন:

  ```bash
  truffle unbox metacoin
  ```

যে শেষ ধাপের সাথে, আপনি চুক্তি, deployment, testing, এবং কনফিগারেশন ফাইলসহ একটি Truffle প্রজেক্ট cointaining ফোল্ডার তৈরি করেছেন।

এটি হলো `metacoin.sol` ফাইল থেকে প্রাপ্ত স্মার্ট চুক্তির ডেটা:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

মনে রাখবেন, `pragma` স্টেটমেন্টের ঠিক পরেই ConvertLib ইমপোর্ট করা হয়েছে। এই প্রজেক্টে আসলে দুটি স্মার্ট চুক্তি রয়েছে, যা সবশেষে ডিপ্লয় করা হবে: একটি হলো Metacoin, যেখানে সকল প্রেরিত ও ব্যালেন্স লজিক রয়েছে; অন্যটি হলো ConvertLib, যা মান রূপান্তর করার জন্য ব্যবহৃত একটি লাইব্রেরি।

:::

### চুক্তি পরীক্ষা করা {#testing-the-contract}

আপনি সলিডিটি এবং জাভাস্ক্রিপ্ট টেস্ট চালাতে পারেন।

1. একটি টার্মিনালে সলিডিটি টেস্ট চালান:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

আপনাকে নিম্নলিখিত আউটপুট দেখতে হবে:

![img](/img/truffle/test1.png)

2. জাভাস্ক্রিপ্ট টেস্ট চালান:

  ```bash
  truffle test ./test/metacoin.js
  ```

আপনাকে নিম্নলিখিত আউটপুট দেখতে হবে:

![img](/img/truffle/test2.png)

### চুক্তি সংকলন করা {#compiling-the-contract}

নিম্নলিখিত কমান্ড ব্যবহার করে স্মার্ট contract কম্পাইল করুন:

```bash
truffle compile
```

আপনি নিম্নলিখিত আউটপুট দেখতে পাবেন:

![img](/img/truffle/compile.png)

### স্মার্ট চুক্তি কনফিগার করা {#configuring-the-smart-contract}

চুক্তি সত্যিকারভাবে ডিপ্লয় করার পূর্বে, আপনাকে `truffle-config.js` ফাইল সেট আপ করতে হবে, নেটওয়ার্ক ও কম্পাইলারের ডেটা প্রবেশ করাতে হবে।

যান `truffle-config.js`এবং Polygon মুম্বাই নেটওয়ার্ক বিস্তারিত সহ ফাইল আপডেট করুন।

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

মনে রাখবেন যে এর জন্য অবশ্যই mnemonic পাস করতে হবে `maticProvider`। আপনি যে অ্যাকাউন্ট থেকে deploy  করতে চান তার জন্য এটি হচ্ছে সিড ফ্রেজ (বা প্রাইভেট কী)। রুট ডিরেক্টরিতে একটি নতুন `.secret` ফাইল তৈরি করুন এবং শুরু করতে আপনার 12-শব্দের নিমোনিক সিড ফ্রেজটি লিখুন। MetaMask ওয়ালেটটি থেকে seed পাওয়ার জন্য, আপনি MetaMask সেটিংস যেতে পারেন, তারপর মেনুটি থেকে, **সিকিউরিটি এবং প্রাইভেসি** চয়ন করুন যেখানে আপনি একটি বাটন দেখতে পাবেন যা **বীজ শব্দ প্রকাশ** করে।

### Polygon নেটওয়ার্কে Deploying করা হচ্ছে {#deploying-on-polygon-network}

[Polygon কল](https://faucet.polygon.technology/) ব্যবহার করে আপনার ওয়ালেটে MATIC যোগ করুন। পরবর্তী, প্রজেক্ট ডিরেক্টরির মূল ফোল্ডারে এই কমান্ড রান করুন:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

`address`আপনার মনে রাখবেন , `transaction_hash`এবং প্রদত্ত অন্যান্য বিবরণ ভিন্ন হবে। উপরে শুধু কাঠামো সম্পর্কে একটি ধারণা দেওয়া হলো।

:::

**অভিনন্দন! আপনি সফলভাবে Truffle ব্যবহার করে একটি স্মার্ট কন্ট্রাক মোতায়েন করেছেন।** এখন আপনি চুক্তির সাথে ইন্টারঅ্যাক্ট করতে পারেন এবং [Polygonscan](https://mumbai.polygonscan.com/)-এ তার deployment মেন্ট স্ট্যাটাস চেক করতে পারেন।
