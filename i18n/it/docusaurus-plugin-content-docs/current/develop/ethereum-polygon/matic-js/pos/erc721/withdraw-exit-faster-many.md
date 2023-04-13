---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Esce dal processo di prelievo usando txHash da `withdrawStartMany`.'
---

Il metodo `withdrawExitFasterMany` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStartMany`.


È veloce perché genera una prova nel backend. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
