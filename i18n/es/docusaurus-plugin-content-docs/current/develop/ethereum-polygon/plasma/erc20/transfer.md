---
id: transfer
title: transfer (Transferir)
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Transfiere tokens ERC-20 de Plasma'
---

# Transferencia {#transfer}

El método `transfer` se puede utilizar para transferir un monto de una dirección a otra.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Transfiere el token MATIC {#transfer-matic-token}

MATIC es un token nativo en Polygon. Así que admitimos la transferencia de tokens MATIC sin dirección de tokens.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
