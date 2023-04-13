---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawStart {#withdrawstart}

Metode `withdrawStart` digunakan untuk memulai proses penarikan yang akan membakar jumlah token matik yang ditentukan pada token matik anak.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

simpan txHash yang akan digunakan untuk menantang proses penarikan.
