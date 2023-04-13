---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Предоставляет метод для взаимодействия с токеном ERC20."
---

# ERC20 {#erc20}

`POSClient` предоставляет метод `erc20`, который помогает взаимодействовать с токеном **ERC20**.

Метод возвращает объект с различными другими методами.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Передача вторых аргументов для `isRoot` является необязательной.

## Дочерний токен {#child-token}

Токен на polygon можно инициировать с помощью следующего синтаксиса:

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Родительский токен {#parent-token}

Токен на ethereum можно инициировать, предоставив второе значение параметра как `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
