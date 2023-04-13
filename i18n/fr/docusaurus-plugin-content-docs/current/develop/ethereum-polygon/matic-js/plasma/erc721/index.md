---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Fournit une méthode « ERC721 » pour interagir avec un jeton erc721.'
---

# ERC721 {#erc721}

`plasmaClient`fournit  `erc721` une méthode qui vous aide à interagir avec un jeton erc721.

La méthode renvoie un objet qui possède diverses méthodes.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Jeton enfant {#child-token}

Un jeton sur polygon peut être initié en utilisant cette syntaxe -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Jeton parent {#parent-token}

Le jeton sur ethereum peut être initié en fournissant la valeur du deuxième paramètre comme `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
