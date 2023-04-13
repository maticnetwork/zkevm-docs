---
id: deposit-ether
title: deposit ether (Depositar Ether)
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Deposita la cantidad requerida de Ether desde Ethereum a Polygon.'
---

El método `depositEther` se puede utilizar para depositar la cantidad requerida de **Ether** desde Ethereum a Polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
