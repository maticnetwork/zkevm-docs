---
id: withdraw-exit-faster
title: withdrawExitFaster (Salir del retiro más rápido)
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Sal del proceso de retiro.'
---

El método `withdrawExitFaster` se puede utilizar para aprobar todos los tokens.

Es rápido porque genera pruebas en el modo de adminsitrador. El modo de administrador se puede configurar con una RPC privada dedicada.

**Nota**: la transacción withdrawStart debe estar verificada en el punto de control para salir del retiro.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
