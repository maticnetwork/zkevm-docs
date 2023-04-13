---
id: index
title: PlasmaClient (Cliente de Plasma)
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Empieza con Matic.js'
---

# ERC-721 {#erc721}

`plasmaClient` proporciona el método `erc721` que te ayuda a interactuar con un token ERC-721.

Este método muestra un objeto que contiene varios métodos.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Token secundario {#child-token}

El token en Polygon se puede iniciar usando esta sintaxis:

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Token primario {#parent-token}

Los token de Ethereum se pueden iniciar pasando `true` como valor del segundo parámetro.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
