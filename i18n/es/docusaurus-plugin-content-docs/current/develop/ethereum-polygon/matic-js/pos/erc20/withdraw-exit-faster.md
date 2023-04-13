---
id: withdraw-exit-faster
title: Salida más rápida del retiro
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Sal del proceso de retiro más rápido utilizando el hash de las transacciones de withdrawStart.'
---

El método `withdrawExitFaster` puede utilizarse para salir del proceso de retiro más rápido utilizando el hash de la transacción del método `withdrawStart` .

Generalmente es rápido porque genera pruebas en el modo de administrador. Debes configurar [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transacción de withdrawStart (Inicio de retiro) debe ser verificada en el punto de control para salir del retiro.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Una vez completada la transacción y el punto de control, el monto se depositará en la cadena primaria.
