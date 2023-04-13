---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Iniciar o processo de retirada.'
---

O método `withdrawStartMany` pode ser usado para iniciar o processo de retirada, que irá fazer burn de múltiplos tokens na chain da Polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
