---
id: withdraw-exit-faster
title: Il metodo withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Uscire dal processo di prelievo utilizzando txHash da withdrawStart.'
---

Il metodo `withdrawExitFaster` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStart`.

È veloce perché genera una prova nel backend. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
