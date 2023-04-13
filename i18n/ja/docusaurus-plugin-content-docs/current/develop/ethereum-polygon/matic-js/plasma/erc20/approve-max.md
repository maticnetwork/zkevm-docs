---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'ルートトークンで最大量を承認します。'
---

`approveMax`メソッドはルートトークンで最大量を承認するために使用することができます。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
