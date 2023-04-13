---
id: index
title: 'POSClient'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'POSClient আপনাকে POS ব্রিজের সাথে ইন্টারঅ্যাক্ট করার সুযোগ দেয়।'
---

**POS** ব্রিজের সাথে ইন্টারঅ্যাক্ট করতে `maticjs`ক`POSClient`ে সুযোগ করে দেয়।

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

`POSClient` শুরু হওয়ার পর, আপনি উপলভ্য সকল APIS-এর সাথে ইন্টারঅ্যাক্ট করতে পারবেন।
