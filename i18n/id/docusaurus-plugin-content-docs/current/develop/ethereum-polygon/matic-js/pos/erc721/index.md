---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'Metode `ERC721` yang membantu Anda berinteraksi dengan token ERC721.'
---

# ERC721 {#erc721}

`POSClient` menyediakan metode `erc721` yang akan membantu Anda berinteraksi dengan token erc721.

Metode ini memberikan objek yang memiliki berbagai metode.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Meneruskan argumen kedua untuk `isRoot` bersifat opsional.

## Token anak {#child-token}

Token pada polygon dapat dimulai dengan menggunakan sintaks ini -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Token induk {#parent-token}

Token pada ethereum dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
