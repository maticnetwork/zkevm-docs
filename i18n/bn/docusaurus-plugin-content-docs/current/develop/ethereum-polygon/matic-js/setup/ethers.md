---
id: ethers
title: 'Ethers সেটআপ'
keywords:
  - pos client
  - erc20
  - withdrawExit
  - polygon
  - sdk
description: 'ethers.js ইনস্টল ও সেট আপ করুন'
---

# Ether.js {#ether-js}

Ethereum ব্লকচেইন ও তার ইকোসিস্টেমের সাথে ইন্টারঅ্যাক্ট করার জন্য [ethers.js](https://docs.ethers.io/) লাইব্রেরি একটি পরিপূর্ণ ও সংহত লাইব্রেরি হয়ে উঠতে চায়।

## ether.js সেটআপ করুন {#setup-ether-js}

MATIC.js-এর প্লাগইন হিসেবে পৃথক প্যাকেজের মাধ্যমে ether.js সাপোর্ট উপলভ্য।

### ইনস্টলেশন {#installation}

```
npm install @maticnetwork/maticjs-ethers

```

### সেটআপ {#setup}

```
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
```

ethers ব্যবহার করে `POSClient` তৈরি করার একটি দৃষ্টান্ত দেখা যাক -

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

## দৃষ্টান্ত {#examples}

বিভিন্ন ক্ষেত্রের জন্য প্রাসঙ্গিক দৃষ্টান্ত [ethers প্লাগইন রেপোতে](https://github.com/maticnetwork/maticjs-ethers) পাওয়া যায়।
