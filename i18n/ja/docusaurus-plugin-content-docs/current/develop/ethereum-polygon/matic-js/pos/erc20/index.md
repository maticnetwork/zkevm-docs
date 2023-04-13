---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "ERC20トークンとやり取りするメソッドを提供します。"
---

# ERC20 {#erc20}

`POSClient`は、**ERC20**トークンとやり取りするのに役立つ`erc20`メソッドを提供します。

メソッドは、他のさまざまなメソッドを持つオブジェクトを返します。

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

`isRoot`の2番目の引数を渡すことはオプションです。

## 子トークン {#child-token}

Polygonのトークンは、この構文を使用して開始できます。

```
const childERC20Token = posClient.erc20(<child token address>);
```

## 親トークン {#parent-token}

Ethereumのトークンは、2番目のパラメーター値を`true`として指定することで開始できます。

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
