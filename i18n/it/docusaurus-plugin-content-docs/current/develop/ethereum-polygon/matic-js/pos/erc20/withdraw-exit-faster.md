---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Esce dal processo di prelievo più rapidamente utilizzando il txHash di withdrawStart.'
---

Il metodo `withdrawExitFaster` può essere utilizzato per uscire più rapidamente dal processo di prelievo utilizzando il txHash del metodo `withdrawStart`.

Generalmente è veloce perché genera la prova nel back-end. Devi configurare [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Una volta completata la transazione ed eseguito il checkpoint, l'importo verrà depositato nella catena root.
