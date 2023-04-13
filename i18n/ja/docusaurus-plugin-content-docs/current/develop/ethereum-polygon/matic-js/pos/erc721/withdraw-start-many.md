---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStartMany`メソッドを使用して、引き出すプロセスを開始して、複数のトークンをPolygonチェーンにバーンできます。

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
