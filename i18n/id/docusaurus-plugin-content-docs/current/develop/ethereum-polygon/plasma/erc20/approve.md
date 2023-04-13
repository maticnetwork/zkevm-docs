---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# approve {#approve}

Metode `approve` dapat digunakan untuk menyetujui jumlah yang dibutuhkan pada token root.

approve diperlukan untuk menyetor jumlah di rantai polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
