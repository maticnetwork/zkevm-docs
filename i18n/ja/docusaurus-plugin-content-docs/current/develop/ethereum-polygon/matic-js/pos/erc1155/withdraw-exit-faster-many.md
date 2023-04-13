---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'withdrawStartManyからtxHashを使用して引き出すプロセスを終了します。'
---

`withdrawExitFasterMany`メソッドは、`withdrawStartMany`メソッドからtxHashを使用して引き出すプロセスを終了するために使用できます。

バックエンドで証明を生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。


**注意**事項- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
