---
id: web3
title: 'Web3js সেটআপ'
keywords:
 - pos client
 - erc20
 - withdrawExit
 - polygon
 - sdk
description: 'web3.js ইনস্টল এবং সেট আপ করুন।'
---

# Web3.js {#web3-js}

[web3.js](https://web3js.readthedocs.io/) হলো একগুচ্ছ লাইব্রেরি যা আপনাকে HTTP, IPC বা WebSocket ব্যবহার করে কোনো লোকাল বা রিমোট Ethereum নোডের সাথে ইন্টারঅ্যাক্ট করার সুযোগ দেয়।

## web3.js সেটআপ করুন {#setup-web3-js}

MATIC.js-এর প্লাগইন হিসেবে পৃথক প্যাকেজের মাধ্যমে web3.js সাপোর্ট উপলভ্য।

### ইনস্টলেশন {#installation}

```
npm install @maticnetwork/maticjs-web3

```

### সেটআপ {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

web3 ব্যবহার করে `POSClient` তৈরি করার একটি উদাহরণ দেখা যাক -

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

## উদাহরণ {#examples}

[web3 প্লাগইন repo](https://github.com/maticnetwork/maticjs-web3)-তে ভিন্ন ভিন্ন ঘটনার উদাহরণ রয়েছে
