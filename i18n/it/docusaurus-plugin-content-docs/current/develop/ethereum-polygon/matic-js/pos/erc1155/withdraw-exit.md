---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Uscire dal processo di prelievo utilizzando txHash da withdrawStart.'
---

Il metodo `withdrawExit` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
