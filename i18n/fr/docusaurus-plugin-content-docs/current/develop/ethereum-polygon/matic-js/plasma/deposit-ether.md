---
id: deposit-ether
title: depôt
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Verser le nombre requis d'' éther d’Ethereum à Polygone.'
---

`depositEther`la méthode  peut être utilisée pour déposer le montant nécessaire d' **ether** d’Ethereum à Polygone.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
