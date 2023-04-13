---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# getBalance {#getbalance}

ব্যবহারকারীর ব্যালেন্স পেতে `getBalance`পদ্ধতি ব্যবহার করা যেতে পারে। এটি চাইল্ড ও প্যারেন্ট উভয় টোকেনেই পাওয়া যায়।

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
