---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawStartMany {#withdrawstartmany}

`withdrawStartMany` può essere utilizzato per avviare il processo di prelievo che eseguirà il burn del token multiplo sulla catena di Polygon.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
