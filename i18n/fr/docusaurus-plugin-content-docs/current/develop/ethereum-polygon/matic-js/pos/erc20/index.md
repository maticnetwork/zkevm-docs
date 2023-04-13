---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Fournit une méthode pour interagir avec un jeton ERC20."
---

# ERC20 {#erc20}

`POSClient` fournit `erc20` une méthode qui vous aide à interagir avec un jeton **ERC20** .

La méthode renvoie un objet qui possède d'autres méthodes différentes.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Passer des seconds arguments pour `isRoot` est facultatif.

## Jeton enfant {#child-token}

Un jeton sur polygon peut être initié en utilisant cette syntaxe -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Jeton parent {#parent-token}

Le jeton sur ethereum peut être initié en fournissant la valeur du second paramètre en tant que `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
