---
id: get-started
title: শুরু করুন
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.js দিয়ে শুরু করুন
---

`@matic.js` একটি জাভাস্ক্রিপ্ট লাইব্রেরি যা Matic নেটওয়ার্কের বিভিন্ন উপাদানের সাথে ইন্টারঅ্যাক্ট করতে সাহায্য করে।

এই শুরু করুন টিউটোরিয়ালে - আমরা কিভাবে POS ব্রিজ সেটআপ এবং ইন্টারঅ্যাক্ট করতে হবে তা শিখব।

## ইনস্টলেশন {#installation}

**npm দিয়ে maticjs প্যাকেজ ইনস্টল করুন:**

```bash
npm install @maticnetwork/maticjs
```

**web3js প্লাগইন ইনস্টল করুন**

```bash
npm install @maticnetwork/maticjs-web3
```

## সেটআপ {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

উপরের কোডে আমরা `web3js` দিয়ে maticjs শুরু করছি, কিন্তু আপনি চাইলে একই রকম ভাবে [Ehters](/docs/develop/ethereum-polygon/matic-js/setup/ethers) দিয়েও শুরু করতে পারবেন।

## POS ক্লায়েন্ট {#pos-client}

`POSClient` আমাদেরকে POS ব্রিজের সাথে ইন্টারঅ্যাক্ট করতে সাহায্য করে।

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

`POSClient` শুরু করার পরে, আমাদের প্রয়োজনীয় টোকেনের ধরণ শুরু করতে হবে যেমন- `erc20`, `erc721` ইত্যাদি।

চলুন `erc20` শুরু করা যাক -

### erc20 {#erc20}

**erc20 চাইল্ড টোকেন তৈরি করুন**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**erc20 প্যারেন্ট টোকেন তৈরি করুন**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

একবার erc20 চালু হলে, আপনি উপলব্ধ বিভিন্ন পদ্ধতিতে কল করতে পারেন, যেমন - `getBalance`, `approve`, `deposit`, `withdraw` ইত্যাদি।

আসুন কিছু API-এর উদাহরণ দেখি -

#### ব্যালেন্স পেতে {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### অনুমোদন দিন {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


আপনি দেখতেই পাচ্ছেন যে MaticJS-এর সহজ API দিয়ে খুব সহজেই MaticJS ব্রিজ দিয়ে ইন্টারঅ্যাক্ট করতে পারবেন। **আসুন খুব ভালো কিছু তৈরি করে শুরু করা যাক**

### কিছু গুরুত্বপূর্ণ লিঙ্ক {#some-important-links}

- [উদাহরণ](https://github.com/maticnetwork/matic.js/tree/master/examples)
