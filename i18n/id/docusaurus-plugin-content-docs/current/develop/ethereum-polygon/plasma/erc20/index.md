---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# ERC20 {#erc20}

`plasmaClient` menyediakan metode `erc20` yang akan membantu Anda berinteraksi dengan tokenerc20.

## Token anak {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token root {#root-token}

Token root dapat diinisiasi dengan menyediakan nilai parameter kedua sebagai `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
