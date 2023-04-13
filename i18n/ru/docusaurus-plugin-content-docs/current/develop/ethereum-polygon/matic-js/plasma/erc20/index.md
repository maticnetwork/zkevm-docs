---
id: index
title: PlasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Предоставляет метод для взаимодействия с токеном ERC20.'
---

`plasmaClient` предоставляет метод `erc20`, помогающий взаимодействовать с токеном erc20.

## Дочерний токен {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Корневой токен {#root-token}

Корневой токен может быть инициирован посредством указания второго значения параметра как `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
