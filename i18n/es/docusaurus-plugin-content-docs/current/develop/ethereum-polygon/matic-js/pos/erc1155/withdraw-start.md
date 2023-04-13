---
id: withdraw-start
title: withdrawStart (Inicio del retiro)
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Inicia el proceso de retiro.'
---

El método `withdrawStart` se puede utilizar para iniciar el proceso de retiro que quemará el monto especificado de la ID del token en la cadena de Polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
