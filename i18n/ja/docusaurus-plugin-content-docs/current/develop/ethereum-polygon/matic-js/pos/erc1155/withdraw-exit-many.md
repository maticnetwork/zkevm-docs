---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'withdrawStartからtxHashを使用して引き出すプロセスを終了します。'
---

`withdrawExitMany`メソッドは、`withdrawStartMany`メソッドからtxHashを使用して引き出すプロセスを終了するために使用できます。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
