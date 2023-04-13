---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

`withdrawStartMany`পদ্ধতি ব্যবহার করা যেতে পারে উইথড্র প্রক্রিয়া শুরু করার জন্য, যেখানে Polygon চেইনে একাধিক টোকেন বার্ন করবে।

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
