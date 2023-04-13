---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'Метод `ERC721`, помогающий взаимодействовать с токеном erc721.'
---

# ERC721 {#erc721}

`POSClient` предоставляет метод `erc721`, помогающий взаимодействовать с токеном erc721.

Данный метод возвращает объект, имеющий различные методы.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Передача вторых аргументов для `isRoot` является необязательной.

## Дочерний токен {#child-token}

Токен на polygon можно инициировать с помощью следующего синтаксиса:

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Родительский токен {#parent-token}

Токен на ethereum может быть инициирован посредством указания второго значения параметра как `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
