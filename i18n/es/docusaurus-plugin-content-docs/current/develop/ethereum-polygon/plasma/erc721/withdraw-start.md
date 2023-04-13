---
id: withdraw-start
title: withdrawStart (Inicio del retiro)
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Empieza con Matic.js'
---

# withdrawStart (Inicio del retiro) {#withdrawstart}

El método `withdrawStart` se puede utilizar para iniciar el proceso de retiro que quemará el token especificado en la cadena de Polygon.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
