---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'Sal del proceso de retiro usando el hash de la transacción withdrawStartMany.'
---

El método `withdrawExitFasterMany` puede utilizarse para salir del proceso de retiro utilizando el hash de la transacción del método `withdrawStartMany`.

Es rápido porque genera pruebas en el modo de administrador. Debes configurar [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).


**Nota**: la transacción withdrawStart debe ser verificada en el punto de control para salir del retiro.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
