---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStart`メソッドを使用して、引き出すプロセスを開始して、特定のトークンをPolygonチェーンにバーンできます。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
