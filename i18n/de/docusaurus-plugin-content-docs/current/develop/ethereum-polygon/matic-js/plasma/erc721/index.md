---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Stellt eine ERC721-Methode zur Kommunikation mit einem erc721-Token bereit.'
---

# ERC721 {#erc721}

`plasmaClient`ist eine `erc721`-Methode zum Datenaustausch mit einem erc721-Token.

Die Methode ergibt ein Objekt, das über verschiedene Funktionen verfügt.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Child-Token {#child-token}

Auf Polygon kann ein Token mit dieser Syntax eingeführt werden -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Parent-Token {#parent-token}

Auf Ethereum kann ein Token durch Angabe des zweiten Parameterwertes als `true`aktiviert werden.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
