---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Interagissez avec le jeton ERC1155 en utilisant matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` fournit `erc1155` une méthode qui vous aide à interagir avec un jeton ERC1155.

La méthode renvoie l'instance de la classe **ERC1155** qui contient différentes méthodes.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Passer des seconds arguments pour `isRoot` est facultatif.

## Jeton enfant {#child-token}

Un jeton sur polygon peut être initié en utilisant cette syntaxe -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Jeton parent {#parent-token}

Le jeton sur ethereum peut être initié en fournissant la valeur du deuxième paramètre comme `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
