---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Introduzione a maticjs'
---

# depositEther {#depositether}

Il metodo `depositEther` può essere utilizzato per depositare l'importo richiesto di **ether** da Ethereum a polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
