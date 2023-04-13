---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'MATIC.js ব্যবহার করে ERC1155 টোকেনের ব্যালেন্স জানা।'
---

কোনো টোকেনের ক্ষেত্রে ব্যবহারকারীর ব্যালেন্স পেতে `getBalance`পদ্ধতি ব্যবহার করা যেতে পারে। চাইল্ড ও প্যারেন্ট উভয় টোকেনেই এটি পাওয়া যায়।

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
