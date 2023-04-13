---
id: abi-manager
title: ABIManager
keywords:
- 'abi manager, api type, read, write, polygon'
description: "MATIC.js এর অভ্যন্তরীণ ABI ম্যানেজার।"
---

আপনার জন্য ABI ব্যবস্থাপনা, কনফিগারেশন পরিচালনা করার জন্য `matic.js`অভ্যন্তরীণভাবে `ABIManager` ব্যবহার করে। ABI এবং কনফিগারেশনের সবটাই [স্ট্যাটিক রেপো](https://github.com/maticnetwork/static) থেকে নেওয়া হয়।

## ABI পরিবর্তন করুন {#change-abi}

কখনও কখনও আপনাকে ABI পরিবর্তন করতে হবে, বিশেষ করে যখন আপনি কোনো চুক্তি তৈরি করতে যাচ্ছেন। আপনি `ABIManager`ব্যবহার করে এটি করতে পারেন।

**সিনট্যাক্স**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

নেটওয়ার্কের নাম, চুক্তির নাম, ব্রিজের নাম ইত্যাদি আমাদের [অফিসিয়াল স্ট্যাটিক রেপো](https://github.com/maticnetwork/static/tree/master/network) থেকে নেওয়া যেতে পারে।

**উদাহরণ**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```




