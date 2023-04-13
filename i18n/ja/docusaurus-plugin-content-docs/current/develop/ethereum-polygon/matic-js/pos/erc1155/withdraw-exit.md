---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'withdrawStartからtxHashを使用して引き出すプロセスを終了します。'
---

`withdrawExit`メソッドは、`withdrawStart`メソッドからtxHashを使用して引き出すプロセスを終了するために使用できます。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
