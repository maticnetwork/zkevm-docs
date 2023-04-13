---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Bietet eine Methode zur Kommunikation mit einem ERC20-Token."
---

# ERC20 {#erc20}

`POSClient` bietet `erc20`eine -Methode zum Datenaustausch mit einem **ERC20** Token.

Die Methode gibt ein Objekt zurück, das andere verschiedene Methoden hat.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Optional können Zweitargumente für `isRoot` weitergegeben werden.

## Child-Token {#child-token}

Auf Polygon kann ein Token mit dieser Syntax eingeführt werden -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Parent-Token {#parent-token}

Token auf Ethereum können mit Bereitstellung des zweiten Parameterwertes als `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
