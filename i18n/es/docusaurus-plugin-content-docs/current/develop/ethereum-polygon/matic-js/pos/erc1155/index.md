---
id: index
title: POSClient (Cliente de pruebas de participación)
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Interactúa con el token ERC-1155 con el uso de matic.js.'
---

# ERC-1155 {#erc1155}

`POSClient`proporciona el método `erc1155` que te ayuda a interactuar con un token ERC-1155.

El método devuelve la instancia de **ERC-115** que contiene diferentes métodos.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Pasar los segundos argumentos para `isRoot` es opcional.

## Token secundario {#child-token}

El token en Polygon se puede iniciar usando esta sintaxis:

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Token primario {#parent-token}

Los token de Ethereum se pueden iniciar pasando `true` como valor del segundo parámetro.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
