---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Depositar múltiplos tokens de Ethereum para a chain da Polygon.'
---

O método `depositMany` pode ser usado para depositar múltiplos tokens de Ethereum para a chain da Polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
