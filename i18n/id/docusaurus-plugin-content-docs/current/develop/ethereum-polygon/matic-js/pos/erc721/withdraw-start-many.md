---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Menginisiasi proses penarikan.'
---

Metode `withdrawStartMany` dapat digunakan untuk menginisiasi proses penarikan yang akan membakar beberapa token di rantai polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
