---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Uscire dal processo di prelievo.'
---

Il metodo  `withdrawExitFaster` può essere utilizzato per approvare tutti i token.

È veloce perché genera prova nel backend. Il backend può essere configurato con un rpc privato dedicato.

**Nota**: per la transazione withdrawStart deve essere eseguito il checkpoint per poter uscire dal prelievo.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
