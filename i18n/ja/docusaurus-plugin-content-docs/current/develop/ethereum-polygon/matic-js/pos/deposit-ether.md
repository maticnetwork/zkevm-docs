---
id: deposit-ether
title: etherの入金
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'EthereumからPolygonにetherの必要な量を入金します。'
---

`depositEther`メソッドはEthereumからPolygonに必要な量の**ether**を入金するために使用することができます。

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
