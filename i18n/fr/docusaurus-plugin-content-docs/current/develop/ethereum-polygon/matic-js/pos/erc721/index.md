---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'La méthode « ERC721 » qui vous aide à interagir avec un jeton ERC721.'
---

# ERC721 {#erc721}

`POSClient`fournit  `erc721` une méthode qui vous aide à interagir avec un jeton erc721.

La méthode renvoie un objet qui possède diverses méthodes.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Passer des seconds arguments pour `isRoot` est facultatif.

## Jeton enfant {#child-token}

Un jeton sur polygon peut être initié en utilisant cette syntaxe -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Jeton parent {#parent-token}

Le jeton sur ethereum peut être initié en fournissant la valeur du deuxième paramètre comme `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
