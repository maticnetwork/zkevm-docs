---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Introdução ao maticjs'
---

# ERC-20 {#erc20}

`plasmaClient` fornece o método `erc20`, que o ajuda a interagir com um token ERC-20.

## Token filho {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token ROOT {#root-token}

O token ROOT pode ser iniciado fornecendo um segundo valor de parâmetro como .`true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
