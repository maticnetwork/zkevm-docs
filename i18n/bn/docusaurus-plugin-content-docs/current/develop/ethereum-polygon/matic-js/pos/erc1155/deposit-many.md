---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'matic.js ব্যবহার করে ERC1155 টোকেনগুলোর একাধিক জমাকরণ'
---

Ethereum থেকে Polygon চেইনে প্রয়োজনীয় পরিমাণে একাধিক টোকেন জমা করার জন্য `depositMany`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

**ডেটা** সরবরাহ করা ঐচ্ছিক ব্যাপার।