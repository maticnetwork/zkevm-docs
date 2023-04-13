---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Взаимодействуйте с токеном ERC1155 с помощью matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` предоставляет метод `erc1155`, который помогает взаимодействовать с токеном erc1155.

Метод возвращает экземпляр класса **ERC1155**, который содержит различные методы.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Передача вторых аргументов для `isRoot` является необязательной.

## Дочерний токен {#child-token}

Токен на polygon можно инициировать с помощью следующего синтаксиса:

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Родительский токен {#parent-token}

Токен на ethereum может быть инициирован посредством указания второго значения параметра как `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
