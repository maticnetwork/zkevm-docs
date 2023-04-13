---
id: deposit-ether
title: deposit ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Erforderliche Menge an ether von Ethereum auf Polygon einzahlen.'
---

`depositEther` Methode kann verwendet werden, um die erforderliche Menge an **ether** von Ethereum auf Polygon einzuzahlen.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
