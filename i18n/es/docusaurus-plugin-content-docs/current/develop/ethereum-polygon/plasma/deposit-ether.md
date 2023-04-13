---
id: deposit-ether
title: deposit (Depósito)
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Empieza con maticjs'
---

# depositEther (Depósito de Ether) {#depositether}

El método `depositEther` se puede utilizar para depositar la cantidad requerida de **Ether** de Ethereum a Polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
