---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStart`メソッドを使用して、引き出すプロセスを開始して、特定のトークンIDをPolygonチェーンにバーンできます。

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
