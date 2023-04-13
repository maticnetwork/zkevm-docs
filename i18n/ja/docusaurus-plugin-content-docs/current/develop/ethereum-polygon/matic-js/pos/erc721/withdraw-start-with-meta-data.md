---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'メタデータを使用して引き出しプロセスを開始します。'
---

`withdrawStartWithMetaData`メソッドを使用して、引き出しプロセスを開始して、特定のトークンをPolygonチェーンにバーンできます。フードの下で、トークンコントラクトで`withdrawWithMetadata`メソッドを呼び出します。


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
