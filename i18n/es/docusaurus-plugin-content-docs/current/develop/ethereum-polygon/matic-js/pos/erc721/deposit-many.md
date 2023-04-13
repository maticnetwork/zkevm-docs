---
id: deposit-many
title: depositMany (Depositar muchos)
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Deposita múltiples tokens de Ethereum a la cadena de Polygon'
---

El método `depositMany` se puede utilizar para depositar múltiples tokens de Ethereum a la cadena de Polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
