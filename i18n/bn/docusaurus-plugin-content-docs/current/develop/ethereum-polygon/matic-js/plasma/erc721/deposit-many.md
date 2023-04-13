---
id: deposit-many
title: deplasmaitMany
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'Ethereum থেকে Polygon চেইনে একাধিক টোকেন জমা দেয়।'
---

Ethereum থেকে Polygon চেইনে একাধিক টোকেন জমা দিতে `deplasmaitMany`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
