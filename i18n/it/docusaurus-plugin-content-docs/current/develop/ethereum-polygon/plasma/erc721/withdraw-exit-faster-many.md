---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

`withdrawExitFasterMany` può essere utilizzato per approvare tutti i token.

È veloce perché genera prova nel backend. Il backend può essere configurato con un rpc privato dedicato.

**Nota**: per la transazione withdrawStart deve essere eseguito il checkpoint per poter uscire dal prelievo.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
