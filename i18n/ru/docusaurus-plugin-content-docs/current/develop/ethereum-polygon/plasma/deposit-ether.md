---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Начните работать с maticjs'
---

# depositEther {#depositether}

Метод `depositEther` можно использовать для внесения в качестве депозита требуемого количества **ether** из ethereum в polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
