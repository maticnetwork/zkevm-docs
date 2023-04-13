---
id: withdraw-exit-faster
title: withdrawExitFaster (Salir del retiro más rápido)
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Sal del proceso de retiro utilizando el hash de la transacción de withdrawStart'
---

El método `withdrawExitFaster` puede utilizarse para salir del proceso de retiro utilizando el hash de la transacción del método `withdrawStart`.


Es rápido porque genera pruebas en el modo de administrador. Debes configurar [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transacción withdrawStart debe ser verificada en el punto de control para salir del retiro.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
