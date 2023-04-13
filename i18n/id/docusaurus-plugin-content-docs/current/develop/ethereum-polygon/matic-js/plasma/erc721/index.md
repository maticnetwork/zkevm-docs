---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Menyediakan metode `ERC721` untuk berinteraksi dengan token erc721.'
---

# ERC721 {#erc721}

`plasmaClient` menyediakan metode `erc721` yang akan membantu Anda berinteraksi dengan token erc721.

Metode ini menampilkan objek yang memiliki berbagai metode.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Token anak {#child-token}

Token pada polygon dapat dimulai dengan menggunakan sintaks ini -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Token induk {#parent-token}

Token pada ethereum dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
