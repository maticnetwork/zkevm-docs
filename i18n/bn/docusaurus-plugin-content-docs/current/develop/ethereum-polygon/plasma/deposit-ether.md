---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# depositEther {#depositether}

Ethereum থেকে Polygon-এ প্রয়োজনীয় পরিমাণ **ether** জমা করার জন্য `depositEther`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
