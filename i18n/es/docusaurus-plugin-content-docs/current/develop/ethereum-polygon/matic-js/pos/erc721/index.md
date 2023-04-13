---
id: index
title: POSClient (Cliente de pruebas de participación)
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'El método ERC-721 te ayuda a interactuar con un token ERC-721.'
---

# ERC-721 {#erc721}

`POSClient` proporciona el método `erc721` que te ayuda a interactuar con un token ERC-721.

El método arroja un objeto que tiene varios métodos.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Pasar los segundos argumentos para `isRoot` es opcional.

## Token secundario {#child-token}

El token en Polygon se puede iniciar usando esta sintaxis:

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Token primario {#parent-token}

Los token de Ethereum se pueden iniciar pasando `true` como valor del segundo parámetro.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
