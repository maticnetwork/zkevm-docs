---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Menyetorkan jumlah **ether** yang diperlukan dari ethereum ke polygon.'
---

Metode `depositEther` dapat digunakan untuk menyetor jumlah **ether** yang diperlukan dari ethereum ke polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
