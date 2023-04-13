---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Uscire dal processo di prelievo utilizzando txHash da withdrawStart.'
---

Il metodo `withdrawExitMany` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
