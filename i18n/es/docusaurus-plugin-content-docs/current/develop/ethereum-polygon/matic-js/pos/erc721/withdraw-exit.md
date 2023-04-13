---
id: withdraw-exit
title: withdrawExit (Salida del retiro)
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Sal del proceso de retiro utilizando el hash de la transacción de withdrawStart'
---

El método `withdrawExit` puede utilizarse para salir del proceso de retiro utilizando el has de la transacción del método `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Este método realiza múltiples llamadas RPC para generar la prueba y la salida del proceso. Por lo tanto, se recomienda utilizar el método withdrawExitFaster (salir del retiro más rápido).
>
