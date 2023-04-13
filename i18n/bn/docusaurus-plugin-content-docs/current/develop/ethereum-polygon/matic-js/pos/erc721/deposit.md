---
id: deposit
title: deposit
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Ethereum থেকে Polygon চেইনে কোনো টোকেন জমা দেয়।'
---

Ethereum থেকে Polygon চেইনে কোনো টোকেন জমা করার জন্য `deposit`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
