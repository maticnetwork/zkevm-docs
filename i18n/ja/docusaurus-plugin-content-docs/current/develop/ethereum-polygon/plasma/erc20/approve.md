---
id: approve
title: 承認
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# 承認 {#approve}

`approve`メソッドは、ルートトークンで必要な量を承認するために使用できます。

Polygonチェーンに入金するために承認が必要です。

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
