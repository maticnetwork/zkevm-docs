---
id: withdraw-exit
title: withdraw exit (Salida del retiro)
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Sal del proceso de retiro usando el hash de la transacción de withdrawStartMany.'
---

El método `withdrawExit` puede utilizarse para salir del proceso de retiro utilizando el has de la transacción del método `withdrawStart`.

**Nota**: la transacción withdrawStart debe ser verificada en el punto de control para salir del retiro.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Este método realiza múltiples llamadas RPC para generar la prueba y la salida del proceso. Por lo tanto, se recomienda utilizar el método withdrawExitFaster (salir del retiro más rápido).
>

