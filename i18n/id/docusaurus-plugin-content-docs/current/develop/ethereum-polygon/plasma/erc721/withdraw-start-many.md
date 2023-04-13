---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawStartMany {#withdrawstartmany}

Metode `withdrawStartMany` dapat digunakan untuk memulai proses penarikan yang akan membakar beberapa token pada rantai polygon.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
