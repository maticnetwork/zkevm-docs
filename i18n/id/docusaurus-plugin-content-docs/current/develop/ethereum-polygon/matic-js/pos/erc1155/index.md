---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Berinteraksi dengan token ERC1155 menggunakan matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` menyediakan metode `erc1155` yang membantu Anda berinteraksi dengan token erc1155.

Metode ini menampilkan instans dari kelas **ERC1155** yang berisi metode yang berbeda.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Meneruskan argumen kedua untuk `isRoot` bersifat opsional.

## Token anak {#child-token}

Token pada polygon dapat dimulai dengan menggunakan sintaks ini -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Token induk {#parent-token}

Token pada ethereum dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
