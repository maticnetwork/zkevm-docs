---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# ERC20 {#erc20}

`plasmaClient` fornisce un metodo `erc20` che aiuta a interagire con un token erc20.

## Token figlio {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token root {#root-token}

Il token root può essere avviato fornendo un secondo valore di parametro come `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
