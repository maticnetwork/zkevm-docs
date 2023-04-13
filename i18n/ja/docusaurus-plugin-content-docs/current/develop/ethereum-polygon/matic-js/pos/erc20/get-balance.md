---
id: get-balance
title: getBalance
keywords:
    - pos client
    - erc20
    - getBalance
    - polygon
    - sdk
description: "ユーザーの残高を取得します。"
---

`getBalance`メソッドを使用して、ユーザーの残高を取得できます。これは子トークンと親トークン両方で利用できます。

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
