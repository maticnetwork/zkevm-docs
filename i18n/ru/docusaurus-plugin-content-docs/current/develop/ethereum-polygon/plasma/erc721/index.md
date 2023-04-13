---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Начните работать с maticjs'
---

# ERC721 {#erc721}

`plasmaClient` предоставляет метод `erc721`, помогающий взаимодействовать с токеном erc721.

Данный метод возвращает объект, имеющий различные методы.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Дочерний токен {#child-token}

Токен на polygon можно инициировать с помощью следующего синтаксиса:

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Родительский токен {#parent-token}

Токен на ethereum может быть инициирован посредством указания второго значения параметра как `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
