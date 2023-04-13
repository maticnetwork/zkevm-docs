---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Ethereum থেকে Polygon চেইনে একাধিক টোকেন জমা দেয়।'
---

Ethereum থেকে Polygon চেইনে একাধিক টোকেন জমা দিতে `depositMany`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
