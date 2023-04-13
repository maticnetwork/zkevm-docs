---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Menginisiasi proses penarikan.'
---

Metode `withdrawStart` digunakan untuk menginisiasi proses penarikan yang akan membakar jumlah tokenID yang ditentukan di rantai polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
