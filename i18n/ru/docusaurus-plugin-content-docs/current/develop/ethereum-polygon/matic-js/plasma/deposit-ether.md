---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Внесите требуемое количество **ether** из ethereum в polygon.'
---

Метод `depositEther` можно использовать для внесения требуемого количества **ether** из ethereum в polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
