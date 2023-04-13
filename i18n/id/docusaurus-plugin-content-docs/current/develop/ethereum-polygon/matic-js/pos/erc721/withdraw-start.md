---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Menginisiasi proses penarikan.'
---

Metode `withdrawStart` digunakan untuk menginisiasi proses penarikan yang akan membakar token yang ditentukan di rantai polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
