---
id: deposit-ether
title: depositar ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Depositar um valor necessário de ether da Ethereum na Polygon.'
---

Pode ser usado o método `depositEther` para depositar o valor necessário de **ether** da Ethereum na Polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
