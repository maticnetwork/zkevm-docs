---
id: deposit-ether
title: deposit (Depositar)
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Deposita la cantidad requerida de Ether de Ethereum a Polygon.'
---

El método `depositEther` se puede utilizar para depositar la cantidad requerida de **Ether** de Ethereum a Polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
