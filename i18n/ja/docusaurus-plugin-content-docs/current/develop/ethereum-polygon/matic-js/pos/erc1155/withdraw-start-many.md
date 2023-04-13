---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: '引き出すプロセスを開始します。'
---

`withdrawStartMany`メソッドを使用して、引き出すプロセスを開始して、複数のトークンの指定された量をそれぞれPolygonチェーンにバーンできます。

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
