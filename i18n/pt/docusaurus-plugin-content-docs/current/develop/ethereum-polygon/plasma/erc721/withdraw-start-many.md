---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawStartMany {#withdrawstartmany}

O método `withdrawStartMany` pode ser usado para iniciar o processo de retirada que irá efetuar o burn de múltiplos tokens na blockchain da Polygon.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
