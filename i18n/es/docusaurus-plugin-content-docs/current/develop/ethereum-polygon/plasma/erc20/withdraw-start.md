---
id: withdraw-start
title: withdraw start (Inicio del retiro)
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Empieza con Matic.js'
---

# withdrawStart (Inicio del retiro) {#withdrawstart}

El método `withdrawStart` se puede utilizar para iniciar el proceso de retiro, que quemará el monto especificado en el token secundario.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Almacena el hash de la transacción que se utilizará para hacer reclamos con respecto al proceso de retiro.
