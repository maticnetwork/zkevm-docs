---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Matic.jsを使用してERC1155トークンの残高を取得します。'
---

`getBalance`メソッドは、ユーザーのトークン残高を取得するために使用することができます。これは子トークンと親トークン両方で利用できます。

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
