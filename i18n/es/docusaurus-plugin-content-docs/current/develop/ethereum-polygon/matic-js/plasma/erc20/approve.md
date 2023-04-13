---
id: approve
title: approve (Aprobar)
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Aprueba la cantidad requerida en el token primario.'
---

El método `approve` puede utilizarse para aprobar la cantidad requerida en el token primario.

La aprobación es necesaria para depositar el importe en la cadena de Polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
