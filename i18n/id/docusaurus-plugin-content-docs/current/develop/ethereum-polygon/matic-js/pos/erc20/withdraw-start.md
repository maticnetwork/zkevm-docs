---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Menginisiasi proses penarikan.'
---

Metode `withdrawStart` digunakan untuk menginisiasi proses penarikan yang akan membakar  jumlah yang ditentukan di rantai polygon.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Hash transaksi yang diterima akan digunakan untuk keluar dari proses penarikan. Jadi kami menyarankan untuk menyimpannya.

