---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'ERC721-Methode, die bei der Kommunikation mit einem ERC721-Token interagiert.'
---

# ERC721 {#erc721}

`POSClient`ist eine `erc721`-Methode zum Datenaustausch mit einem erc721-Token.

Die Methode liefert ein Objekt mit verschiedenen Methoden.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Optional können Zweitargumente für `isRoot` weitergegeben werden.

## Child-Token {#child-token}

Auf Polygon kann ein Token mit dieser Syntax eingeführt werden -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Parent-Token {#parent-token}

Auf Ethereum kann ein Token durch Angabe des zweiten Parameterwertes als `true`aktiviert werden.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
