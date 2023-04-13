---
id: deposit-ether
title: depositar
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Introdução ao maticjs'
---

# depositEther {#depositether}

O método `depositEther` pode ser usado para depositar o valor necessário de **ether** a partir de Ethereum para Polygon..

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
