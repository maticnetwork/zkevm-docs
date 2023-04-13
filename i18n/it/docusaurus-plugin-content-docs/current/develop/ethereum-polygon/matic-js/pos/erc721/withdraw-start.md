---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Avvia il processo di prelievo.'
---

Il metodo `withdrawStart` può essere utilizzato per avviare il processo di prelievo, che esegue il burn del token specificato sulla catena di polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
