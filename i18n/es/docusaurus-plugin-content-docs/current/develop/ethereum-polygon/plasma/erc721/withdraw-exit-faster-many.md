---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Empieza con Matic.js'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

El método `withdrawExitFasterMany` se puede utilizar para aprobar todos los tokens.

Es rápido porque genera pruebas en el modo de adminsitrador. El modo de administrador se puede configurar con una RPC privada dedicada.

**Nota**: la transacción withdrawStart debe estar verificada en el punto de control para salir del retiro.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
