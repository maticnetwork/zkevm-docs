---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Angefragte Menge an **ether** von Ethereum auf Polygon einzahlen.'
---

`depositEther` Methode kann verwendet werden, um die erforderliche Menge an **ether** von Ethereum auf Polygon einzuzahlen.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
