---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# approveMax {#approvemax}

Metode `approveMax` dapat digunakan untuk menyetujui jumlah maksimum pada token root.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
