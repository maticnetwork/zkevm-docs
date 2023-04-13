---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Menyetor banyak token dari ethereum ke rantai polygon.'
---

Metode `depositMany` dapat digunakan untuk menyetor banyak token dari ethereum ke rantai polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
