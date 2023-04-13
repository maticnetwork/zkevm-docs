---
id: deposit-ether
title: deposit ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Menyetorkan jumlah ether yang diperlukan dari ethereum ke polygon.'
---

Metode `depositEther` dapat digunakan untuk menyetor jumlah **ether** yang diperlukan dari ethereum ke polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
