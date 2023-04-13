---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# ERC20 {#erc20}

Ang `plasmaClient` ay nagbibigay ng paraang `erc20` na tumutulong sa iyong makipag-interaksyon sa isang erc20 token.

## Child token {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Root token {#root-token}

Pwedeng pasimulan ang root token sa pamamagitan ng pagbibigay ng pangalawang parameter value na `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
