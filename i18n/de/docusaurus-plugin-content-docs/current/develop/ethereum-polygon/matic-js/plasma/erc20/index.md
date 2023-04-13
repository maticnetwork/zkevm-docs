---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Bietet eine Methode zur Kommunikation mit einem ERC20-Token.'
---

`plasmaClient` ist eine `erc20`-Methode zum Datenaustausch mit einem ERC20-Token.

## Child-Token {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Root-Token {#root-token}

Der Root-Token kann durch Angabe des zweiten Parameterwerts als `true`aktiviert werden.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
