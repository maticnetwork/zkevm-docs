---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Esce dal processo di prelievo utilizzando il txHash di `withdrawStartMany`.'
---

Il metodo `withdrawExitMany` può essere utilizzato per uscire dal processo di prelievo utilizzando il txHash da `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
