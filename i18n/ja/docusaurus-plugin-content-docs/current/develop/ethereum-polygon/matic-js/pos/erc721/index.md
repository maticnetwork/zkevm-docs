---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: '「ERC721」メソッドは、ERC721トークンとやり取りするのに役立ちます。'
---

# ERC721 {#erc721}

`POSClient`は、ERC721トークンとやり取りするのに役立つ`erc721`メソッドを提供します

このメソッドは、さまざまなメソッドを持つオブジェクトを返します。

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

`isRoot`の2番目の引数を渡すことはオプションです。

## 子トークン {#child-token}

Polygonのトークンは、この構文を使用して開始できます。

```
const childERC20Token = posClient.erc721(<child token address>);
```

## 親トークン {#parent-token}

Ethereumのトークンは、2番目のパラメータバリューを`true`として指定することで開始できます。

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
