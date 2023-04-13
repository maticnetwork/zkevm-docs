---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Iniciar o processo de retirada.'
---

O método `withdrawStartMany` pode ser usado para iniciar o processo de retirada que irá fazer burn do montante específico de múltiplos tokens na chain da Polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
