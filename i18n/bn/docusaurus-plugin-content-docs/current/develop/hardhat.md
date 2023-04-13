---
id: hardhat
title: Hardhat ব্যবহার করে একটি স্মার্ট কন্ট্রাক Deploy  করুন
sidebar_label: Using Hardhat
description: Polygon এ একটি স্মার্ট কন্ট্রাক deploy  করতে Hardhat ব্যবহার করুন
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## সংক্ষিপ্ত বিবরণ {#overview}

Hardhat হচ্ছে একটি Ethereum ডেভেলপমেন্ট environment ার যা স্থানীয়ভাবে স্মার্ট কন্ট্র্যাক্ট, রান টেস্ট এবং ডিবাগ সলিডিটি কোড deploy  করার একটি সহজ উপায় সরবরাহ করে।

এই টিউটোরিয়ালে, Hardhat সেটআপ করা এবং কোনো সহজ স্মার্ট চুক্তি তৈরি, টেস্ট ও ডিপ্লয় করতে এর ব্যবহার শিখবেন।

### আপনি কী করবেন {#what-you-will-do}

- Hardhat সেট আপ করুন
- একটি সহজ স্মার্ট চুক্তি তৈরি করুন
- চুক্তি সংকলন করুন
- চুক্তি টেস্ট করুন
- চুক্তি ডিপ্লয় করুন

## ডেভেলপমেন্টের পরিবেশ সেট আপ করা {#setting-up-the-development-environment}

শুরু করার আগে কিছু কারিগরি পূর্বশর্ত রয়েছে। অনুগ্রহ করে এগুলো ইনস্টল করুন:

- [Node.js v10+ LTS এবং npm](https://nodejs.org/en/) (Node-এর সাথে থাকে)
- [Git](https://git-scm.com/)

আমরা সেগুলো ইনস্টল করার পরে, একটি খালি ফোল্ডারে গিয়ে আপনাকে একটি npm প্রকল্প তৈরি করতে হবে,`npm init`  চালাতে হবে এবং Hardhat ইনস্টল করতে তার নির্দেশাবলী অনুসরণ করতে হবে। আপনার প্রজেক্টটি প্রস্তুত হলে, আপনাকে চালাতে হবে:

```bash
npm install --save-dev hardhat
```

আপনার Hardhat প্রজেক্ট তৈরি করতে , আপনার প্রজেক্ট ফোল্ডারে `npx hardhat` চালান। চলুন একটি নমুনা প্রজেক্ট তৈরি করে একটি নমুনা টাস্ক করার জন্য এই ধাপগুলো অনুসরণ করুন এবং নমুনা চুক্তির কম্পাইল, টেস্ট ও ডিপ্লয় করুন।

:::note

এখানে ব্যবহৃত নমুনা প্রজেক্টটি [<ins>Hardhat Quickstart নির্দেশিকা</ins>](https://hardhat.org/getting-started/#quick-start) এবং এর নির্দেশাবলী থেকে আসে।

:::

## কোনো প্রজেক্ট তৈরি করা {#creating-a-project}

একটি নমুনা প্রজেক্ট তৈরি করতে, আপনার প্রজেক্ট ফোল্ডারে `npx hardhat` রান করুন। আপনি এই প্রম্পটি দেখতে পাবেন:

![img](/img/hardhat/quickstart.png)

JavaScript প্রজেক্ট নির্বাচন করুন এবং নমুনা চুক্তিটি কম্পাইল, টেস্ট এবং ডিপ্লয় করতে এই ধাপগুলো অনুসরণ করুন।

### চুক্তি পরীক্ষা করা {#checking-the-contract}

`contracts` ফোল্ডারে রয়েছে `Lock.sol`, যা একটি নমুনা চুক্তি এবং এতে একটি সহজ ডিজিটাল লক রয়েছে, যেখানে ব্যবহারকারীরা একটি নির্দিষ্ট সময় পরে ফান্ড উইথড্র করতে পারবেন।

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### চুক্তি সেট আপ করা {#setting-up-the-contract}

- `hardhat.config.js`-এ যান
- matic-নেটওয়ার্ক-ক্রেডেনশিয়ালের মাধ্যম`hardhat-config`ে  আপডেট করুন
- আপনার প্রাইভেট কী সংরক্ষণ করতে রুটে `.env` ফাইল তৈরি করুন
- Polygonscan-এ চুক্তি যাচাই করতে `.env`-এ Polygonscan API কী যোগ করুন। আপনি [একটি অ্যাকাউন্ট তৈরি করে](https://polygonscan.com/register) একটি API কী তৈরি করতে পারেন

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

মনে রাখবেন, পরিবেশ সংক্রান্ত ভেরিয়েবলগুলো সহ ether এবং etherscan নিয়ন্ত্রণ করতে, উপরের ফাইলে DOTENV প্রয়োজন হয়। এই সবগুলো প্যাকেজ অবশ্যই ইনস্টল করবেন।

DOTENV ব্যবহারের আরো নির্দেশনা পেতে [<ins>এই পেজটি</ins>](https://www.npmjs.com/package/dotenv) দেখুন।

আপনি MATIC-এ polygon mainnet-এ যদি আপনি matic-এ MATIC(Polygon পরিবর্তন করেন

:::

### চুক্তি সংকলন করা {#compiling-the-contract}

চুক্তিটি সংকলন করতে, আপনাকে প্রথমে Hardhat টুলবক্স ইনস্টল করতে হবে:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

তারপর সংকলন করতে শুধু চালান:

```bash
npx hardhat compile
```

### চুক্তি পরীক্ষা করা {#testing-the-contract}

Hardhat-এর মাধ্যমে টেস্ট চালাতে, আপনাকে নিচের বিষয়গুলো টাইপ করতে হবে:

```bash
npx hardhat test
```

এবং এটি একটি প্রত্যাশিত আউটপুট:

![img](/img/hardhat/test.png)

### Polygon নেটওয়ার্কে Deploying করা হচ্ছে {#deploying-on-polygon-network}

প্রজেক্ট ডিরেক্টরির রুট-এ এই কমান্ডটি রান করুন:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

চুক্তিটি MATIC-এর মুম্বই টেস্টনেটে ডিপ্লয় হবে এবং আপনি এখানে ডিপ্লয়মেন্টের স্ট্যাটাস পরীক্ষা করতে পারেন: https://mumbai.polygonscan.com/

**অভিনন্দন! আপনি সফলভাবে Greeter স্মার্ট চুক্তি ডিপ্লয় করেছেন। এখন আপনি স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করতে পারবেন।**

:::tip Polygonscan-এ দ্রুত চুক্তি যাচাই করুন

Polygonscan-এ আপনার চুক্তি দ্রুত যাচাই করতে এই কমান্ডগুলো চালান। আপনার ডিপ্লয় করা চুক্তির সোর্স কোড দেখতে যেকোনো ব্যক্তির জন্য এটি সহজ করে তোলে। জটিল তর্কবিতর্কের তালিকা সহ কন্সট্রাক্টর থাকা চুক্তিগুলোর জন্য, [এখানে](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) দেখুন।

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
