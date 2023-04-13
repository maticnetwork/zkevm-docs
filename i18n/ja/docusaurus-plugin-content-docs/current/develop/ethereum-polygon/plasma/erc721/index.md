---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# ERC721 {#erc721}

`plasmaClient`は、ERC721トークンとやり取りするのに役立つ`erc721`メソッドを提供します

このメソッドは、さまざまなメソッドを持つオブジェクトを返します。

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## 子トークン {#child-token}

Polygonのトークンは、この構文を使用して開始できます。

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## 親トークン {#parent-token}

Ethereumのトークンは、2番目のパラメータバリューを`true`として指定することで開始できます。

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
