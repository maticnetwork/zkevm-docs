---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Iniciar o processo de retirada.'
---

O método `withdrawStart` pode ser usado para iniciar o processo de retirada que irá fazer burn do token especificado na chain da Polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
