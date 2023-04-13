---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient আপনাকে POS ব্রিজের সাথে ইন্টারঅ্যাক্ট করার সুযোগ করে দেয়।'
---

# Plasma ব্রিজ {#plasma-bridge}

Plasma ব্রিজ ফাংশনালিটি [পৃথক রিপোজিটরিতে](https://github.com/maticnetwork/maticjs-plasma) পাওয়া যায়। তাই `plasma`ব্রিজ ব্যবহার করার জন্য, আপনাকে পৃথক প্যাকেজ ইনস্টল করতে হবে।

## ইনস্টলেশন {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## সেটআপ {#setup}

**Plasma** ব্রিজের সাথে ইন্টারঅ্যাক্ট করতে `PlasmaClient`ব্যবহার করা যেতে পারে।

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
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

`plasmaClient` শুরু হওয়ার পর, আপনি উপলভ্য সকল APIS-এর সাথে ইন্টারঅ্যাক্ট করতে পারবেন।
