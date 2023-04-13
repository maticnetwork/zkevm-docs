---
id: approve
title: 承認
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'ルートトークンで必要な量を承認します。'
---

`approve`メソッドは、ルートトークンで必要な額を承認するために使用できます。

Polygonチェーンに入金するために承認が必要です。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
