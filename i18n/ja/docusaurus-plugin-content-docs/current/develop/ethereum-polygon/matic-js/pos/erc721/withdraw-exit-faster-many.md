---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: '「withdrawStartMany」からtxHashを使用して、引き出しプロセスを終了します。'
---

`withdrawExitFasterMany`メソッドは、`withdrawStartMany`メソッドからtxHashを使用して、引き出すプロセスを終了するために使用できます。


バックエンドで証明を生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。

**注意**事項- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
