---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'withdrawStartからtxHashを使用して引き出すプロセスを終了します。'
---

`withdrawExitFaster`メソッドは、`withdrawStart`メソッドからtxHashを使用して引き出すプロセスを終了するために使用できます。

バックエンドで証明を生成するため高速です。[setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)を設定する必要があります。

**注意**事項- 引き出しを終了するには、withdrawStartトランザクションにチェックポイントを設定する必要があります。

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
