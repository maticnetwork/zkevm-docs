---
id: deposit
title: deposit (Depositar)
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Deposita un token de Ethereum a la cadena de Polygon.'
---

El método `deposit` se puede utilizar para depositar un token de Ethereum a la cadena de Polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
