---
id: transfer
title: 転送
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'ユーザーからユーザーにトークンを転送します。'
---

`transfer`メソッドはユーザーから別のユーザーにトークンを転送するために使用できます。

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
