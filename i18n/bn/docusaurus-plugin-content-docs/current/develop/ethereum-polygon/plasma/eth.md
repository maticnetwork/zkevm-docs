---
id: eth
title: ETH জমা এবং উইথড্রের নির্দেশিকা
sidebar_label: ETH
description: "Polygon নেটওয়ার্কে ETH টোকেন জমা এবং উইথড্র করুন।"
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### উচ্চ স্তরের ফ্লো {#high-level-flow}

#### **ETH জমা করুন (1 ধাপের প্রক্রিয়া)**

Polygon চুক্তির যেখানে টোকেন জমা হয় এবং Polygon নেটওয়ার্কে ব্যবহারের জন্য পাওয়া যায় সেখান**ে জম**ার সুবিধাটি প্রয়োগ করা হবে।

#### **ETH ট্রান্সফার করুন**

Polygon-এ আপনার ফান্ড থাকলে, অন্যদেরকে তাৎক্ষণিকভাবে পাঠাতে আপনি সেই ফান্ড ব্যবহার করতে পারেন।

#### **ETH উইথড্র করুন (3 ধাপের প্রক্রিয়া)**

1. Polygon থেকে ফান্ড উইথড্র করার কাজ শুরু হয়। 30 মিনিটের একটি চেকপয়েন্ট ব্যবধান (for জন্য, প্রায় 10 মিনিটের জন্য অপেক্ষা করুন) সেট করা হয়, যেখানে শেষ চেকপয়েন্ট থেকে পলিগন ব্লকের layer ারে সমস্ত ব্লক যাচাই করা A ।
2. একবার চেকপয়েন্ট প্রধান চেইন ERC20 চুক্তিতে জমা দেও, া Once , একটি NFT প্রস্থান (ERC721) টোকেন সমতুল্য মান তৈরি করা হয়।
3. প্রত্যাহারের ফান্ড একটি process-exit পদ্ধতি ব্যবহার করে প্রধান চেইন কন্ট্রাক্ট থেকে আপনার ERC20 to ফিরে claimed া যেতে পারে।

## সেটআপের বিস্তারিত {#setup-details}

### MATIC SDK কনফিগার করা {#configuring-matic-sdk}

ম্যাটিক SDK ইনস্টল করুন (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

MATICJS ক্লায়েন্ট শুরু করা

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

নিম্নলিখিত কন্টেন্টে `process.env`নামকৃত রুট ডিরেক্টরিতে একটি নতুন ফাইল তৈরি করুন:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## জমা করুন {#deposit}

**আমানত**: `depositEther()`চুক্তিটিতে কল করে ডিপোজিট করা যেতে `depositManagerContract`পারে।

মনে রাখবেন যে টোকেন আগে ট্রান্সফার করার জন্য ম্যাপ করা এবং অনুমোদন করা দরকার।

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

একটি স্টেট সিঙ্ক মেকানিজম ব্যবহার করে Ethereum থেকে Polygon পর্যন্ত ডিপোজিট a ে এবং প্রায় 22-30 মিনিট সময় নিন। এই সময় অপেক্ষা করার পরে, web3.js/matic.js লাইব্রেরি বা Metamask ব্যবহার করে ব্যালেন্স চেক করে নিবেন। চাইল্ড চেইনে অন্তত একটি অ্যাসেট ট্রান্সফার করা হলেই এক্সপ্লোরার ব্যালেন্স দেখাবে। জমার বিষয়টি কীভাবে ট্র্যাক করতে হয় তা এই [লিঙ্কটি](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) ব্যাখ্যা করে।

:::

## ট্রান্সফার করুন {#transfer}

Polygon নেটওয়ার্কে ETH হলো একটি WETH (ERC20 টোকেন)।

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## উইথড্র করুন {#withdraw}

### 1. বার্ন করুন {#1-burn}

ব্যবহারকারীরা `getERC20TokenContract`চাইল্ড টোকেন চুক্তির `withdraw`ফাংশন কল করতে পারেন। এই ফাংশনটি টোকেন বার্ন করবে। Polygon Plasma ক্লায়েন্ট এই কল করতে `withdrawStart`পদ্ধতি প্রকাশ করে।

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

ব্যবহারকারীরা চুক্তির `startExitWithBurntTokens()`ফাংশন কল করতে `erc20Predicate`পারেন। Polygon Plasma ক্লায়েন্ট এই কল তৈরি করার `withdrawConfirm()`পদ্ধতি প্রকাশ করে। মেইন চেইনে চেকপয়েন্ট অন্তর্ভুক্ত হওয়ার পরেই কেবল এই ফাংশনটি কল করা যেতে পারে। এই [নির্দেশনাটি](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events) অনুসরণ করে চেকপয়েন্ট অন্তর্ভুক্তির বিষয়টি ট্র্যাক করা যেতে পারে।


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. প্রসেস এক্সিট {#3-process-exit}

একজন ব্যবহারকারীকে অবশ্যই `withdrawManager`চুক্তির `processExits()`ফাংশন কল করুন এবং বার্নের প্রমাণ জমা দিন। বৈধ প্রমাণ জমা দেও, া হলে টোকেন ব্যবহারকারীতে স্থানান্তর করা হয়। Polygon Plasma ক্লায়েন্ট এই কল করতে `withdrawExit()`পদ্ধতি প্রকাশ করে।

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

একটি চেকপয়েন্ট, যা প্রতিটি ~ 5 মিনিটের জন্য Polygon এ ঘটছে এমন সমস্ত লেনদেনের একটি উপস্থাপনা নিয়মিত প্রধান চেইন Ethereum চুক্তিতে জমা দি. ।

:::