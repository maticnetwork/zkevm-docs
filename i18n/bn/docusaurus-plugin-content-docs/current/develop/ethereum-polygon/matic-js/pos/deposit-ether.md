---
id: deposit-ether
title: deposit ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Ethereum থেকে Polygon-এ প্রয়োজনীয় পরিমাণ ether জমা দেওয়া।'
---

Ethereum থেকে Polygon-এ প্রয়োজনীয় পরিমাণ **ether** জমা করার জন্য `depositEther`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
