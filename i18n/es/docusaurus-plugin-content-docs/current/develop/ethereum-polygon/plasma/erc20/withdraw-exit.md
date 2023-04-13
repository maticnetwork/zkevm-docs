---
id: withdraw-exit
title: withdraw exit (Salida del retiro)
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Empieza con Matic.js'
---

# withdrawExit (Salida del retiro) {#withdrawexit}

El método `withdrawExit` puede utilizarse para salir del proceso de retiro una vez finalizado el periodo de controversia.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
