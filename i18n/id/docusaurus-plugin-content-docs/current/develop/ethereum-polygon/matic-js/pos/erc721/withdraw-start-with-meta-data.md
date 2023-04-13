---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Menginisiasi proses penarikan dengan metadata.'
---

Metode `withdrawStartWithMetaData` digunakan untuk menginisiasi proses penarikan yang akan membakar token yang ditentukan di rantai polygon. Di latar belakang, proses ini memanggil metode `withdrawWithMetadata` pada kontrak token.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
