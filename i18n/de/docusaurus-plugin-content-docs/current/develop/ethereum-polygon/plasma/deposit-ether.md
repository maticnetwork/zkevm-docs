---
id: deposit-ether
title: Einzahlung
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Erste Schritte mit maticjs'
---

# depositEther {#depositether}

`depositEther`Methode kann verwendet werden, um die erforderliche Menge an **ether** von Ethereum an Polygon einzuzahlen.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
