---
id: exit-util
title: ExitUtil
keywords:
- 'exit util, api type, read, write, polygon'
description: 'ExitUtil ক্লাসের মাধ্যমে প্রমাণ তৈরি করুন।'
---

প্রমাণ তৈরি করতে `matic.js`অভ্যন্তরীণভাবে ব্যবহার করে`ExitUtil`। এটি এমন একটি ক্লাস যার বেরিয়ে আসার ইউটিলিটিতে সাহায্য করার নানা পদ্ধতি রয়েছে।

## buildPayloadForExit {#buildpayloadforexit}

এটি `buildPayloadForExit`পদ্ধতিকে উন্মোচিত করে যা প্রমাণ তৈরি করতে ব্যবহার করা যেতে পারে।

```
import { ExitUtil, RootChain, use, Web3SideChainClient } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { from, privateKey, RPC } from "./config";
use(Web3ClientPlugin);


const client = new Web3SideChainClient<any>();
// initiate client
await client.init({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, RPC.parent),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, RPC.child),
        defaultConfig: {
            from
        }
    }
});

// create root chain instance
const rootChain = new RootChain(client, <root chain address>);

// create exitUtil Instance
const exitUtil = new ExitUtil(client, rootChain);

// generate proof
const proof = await exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)

```

### ব্রিজ ক্লায়েন্ট ব্যবহার করে প্রমাণ তৈরি করা {#generating-proof-using-bridge-client}

**POSclient**, **PlasmaClient** সহ প্রতিটি ব্রিজ ক্লায়েন্ট `exitUtil`প্রোপার্টি প্রকাশ করে।

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

const proof = await posClient.exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)
```
