---
id: withdraw-start
title: withdraw start (Inicio del retiro)
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Inicia el proceso de retiro.'
---

El método `withdrawStart` se puede utilizar para iniciar el proceso de retiro que quemará el token especificado en la cadena de Polygon.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

El hash de la transacción recibido se utilizará para salir del proceso de retiro. Por lo tanto, te recomendamos almacenarlo.

