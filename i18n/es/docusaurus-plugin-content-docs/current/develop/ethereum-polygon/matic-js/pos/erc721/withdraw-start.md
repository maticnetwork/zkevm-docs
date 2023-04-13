---
id: withdraw-start
title: withdrawStart (Inicio del retiro)
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Inicia el proceso de retiro.'
---

El método `withdrawStart` se puede utilizar para iniciar el proceso de retiro que quemará el token especificado en la cadena de Polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
