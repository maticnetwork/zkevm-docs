---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'Esce dal processo di prelievo utilizzando txHash da withdrawStartMany.'
---

Il metodo `withdrawExitFasterMany` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStartMany`.

È veloce perché genera una prova nel backend. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).


**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
