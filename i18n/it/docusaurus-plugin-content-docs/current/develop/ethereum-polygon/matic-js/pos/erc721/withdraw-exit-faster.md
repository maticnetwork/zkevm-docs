---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Esce dal processo di prelievo usando txHash da `withdrawStart`'
---

Il metodo `withdrawExitFaster` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStart`.


È veloce perché genera una prova nel backend. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
