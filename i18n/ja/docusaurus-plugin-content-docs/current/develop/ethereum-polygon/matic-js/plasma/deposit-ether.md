---
id: deposit-ether
title: 入金
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'EthereumからPolygonに **ether**の必要な量を入金します。'
---

`depositEther`メソッドはEthereumからPolygonに必要な量の**ether**を入金するために使用することができます。

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
