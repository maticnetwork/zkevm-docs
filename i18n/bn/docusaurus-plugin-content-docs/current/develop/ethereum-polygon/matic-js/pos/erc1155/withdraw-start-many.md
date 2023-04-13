---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'উইথড্র প্রক্রিয়া শুরু করে।'
---

উইথড্র প্রক্রিয়া শুরু করার জন্য `withdrawStartMany`পদ্ধতিটি ব্যবহার করা যেতে পারে, যেখানে Polygon চেইনে নির্দিষ্ট পরিমাণ একাধিক টোকেন বার্ন করবে।

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
