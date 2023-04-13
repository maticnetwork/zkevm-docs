---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Kommunikation mit ERC1155 Token mit Hilfe von matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` stellt die `erc1155` bereit, mit der du mit einem erc1155-Token kommunizieren kannst.

Die Methode liefert die Instanz der **ERC1155**-Klasse, die verschiedene Methoden enthält.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Optional können Zweitargumente für `isRoot` weitergegeben werden.

## Child-Token {#child-token}

Auf Polygon kann ein Token mit dieser Syntax eingeführt werden -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Parent-Token {#parent-token}

Auf Ethereum kann ein Token durch Angabe des zweiten Parameterwertes als `true`aktiviert werden.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
