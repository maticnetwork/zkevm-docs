---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Menyediakan metode untuk berinteraksi dengan token ERC20."
---

# ERC20 {#erc20}

`POSClient` menyediakan metode `erc20` yang membantu Anda berinteraksi dengan token **ERC20**.

Metode ini memberikan objek yang memiliki berbagai metode lainnya.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Meneruskan argumen kedua untuk `isRoot` bersifat opsional.

## Token anak {#child-token}

Token pada polygon dapat dimulai dengan menggunakan sintaks ini -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Token induk {#parent-token}

Token di ethereum dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
