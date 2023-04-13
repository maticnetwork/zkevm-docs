---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# ERC20 {#erc20}

`plasmaClient`は、ERC20トークンとやり取りするのに役立つ`erc20`メソッドを提供します。

## 子トークン {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## ルートトークン {#root-token}

ルートトークンは、2番目のバリューを指定することで開始できます`true`。

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
