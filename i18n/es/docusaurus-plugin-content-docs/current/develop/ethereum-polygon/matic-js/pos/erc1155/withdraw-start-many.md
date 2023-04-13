---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Inicia el proceso de retiro.'
---

El método `withdrawStartMany` se puede utilizar para iniciar el proceso de retiro que quemará las cantidades especificadas de múltiples tokens respectivamente en la cadena de Polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
