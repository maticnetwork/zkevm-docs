---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Matic.jsを使用してERC1155トークンとやり取りします。'
---

# ERC1155 {#erc1155}

`POSClient`は、ERC1155トークンとやり取りするのに役立つ`erc1155`メソッドを提供します。

メソッドは、異なるメソッドを含む**ERC1155**クラスのインスタンスを返します。

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

`isRoot`の2番目の引数を渡すことはオプションです。

## 子トークン {#child-token}

Polygonのトークンは、この構文を使用して開始できます。

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## 親トークン {#parent-token}

Ethereumのトークンは、2番目のパラメータバリューを`true`として指定することで開始できます。

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
