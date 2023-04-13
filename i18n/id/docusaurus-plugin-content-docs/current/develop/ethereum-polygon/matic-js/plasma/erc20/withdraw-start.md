---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Menginisiasi proses penarikan.'
---

Metode `withdrawStart` digunakan untuk menginisiasi proses penarikan yang akan membakar jumlah token anak yang ditentukan.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

simpan txHash yang akan digunakan untuk menantang proses penarikan.
