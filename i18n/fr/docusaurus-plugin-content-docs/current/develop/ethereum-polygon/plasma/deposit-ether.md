---
id: deposit-ether
title: déposer
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Commencez avec maticjs'
---

# depositEther {#depositether}

`depositEther`la méthode  peut être utilisée pour déposer le montant nécessaire **** depuis Ethereum à Polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
