---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: '「withdrawStart」からtxHashを使用して、引き出しプロセスを終了します。'
---

`withdrawExitMany`メソッドは、`withdrawStartMany`メソッドからtxHashを使用して、引き出すプロセスを終了するために使用できます。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
