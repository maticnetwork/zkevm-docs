---
id: deposit-ether
title: デポジット
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# depositEther {#depositether}

`depositEther`メソッドはEthereumからPolygonに必要な量の**ether**を入金するために使用することができます。

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
