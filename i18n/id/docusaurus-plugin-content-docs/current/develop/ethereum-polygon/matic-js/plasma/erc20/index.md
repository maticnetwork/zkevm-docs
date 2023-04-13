---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Menyediakan metode untuk berinteraksi dengan token ERC20.'
---

`plasmaClient` menyediakan metode `erc20` yang membantu Anda berinteraksi dengan token erc20.

## Token anak {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token root {#root-token}

Token root dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
