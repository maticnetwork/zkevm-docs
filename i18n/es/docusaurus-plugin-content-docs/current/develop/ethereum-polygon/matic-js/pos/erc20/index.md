---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Proporciona un método para interactuar con un token ERC-20."
---

# ERC-20 {#erc20}

`POSClient` ofrece el método `erc20` que te ayuda a interactuar con un token **ERC-20**.

El método arroja un objeto que tiene otros métodos diferentes.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Pasar los segundos argumentos para `isRoot` es opcional.

## Token secundario {#child-token}

El token en Polygon se puede iniciar usando esta sintaxis:

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Token primario {#parent-token}

El token en Ethereum puede iniciarse al proporcionar el valor del segundo parámetro como `true`

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
