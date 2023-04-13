---
id: deposit-ether
title: depositEther
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Deposita l''importo richiesto di ether da ethereum a polygon.'
---

Il metodo `depositEther`può essere utilizzato per depositare l'importo richiesto di **ether** da Ethereum a polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
