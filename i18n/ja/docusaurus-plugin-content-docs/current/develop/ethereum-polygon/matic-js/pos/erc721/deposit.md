---
id: deposit
title: 入金
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'EthereumからPolygonチェーンにトークンを入金します。'
---

`deposit`メソッドは、EthereumからPolygonチェーンにトークンを入金するために使用できます。

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
