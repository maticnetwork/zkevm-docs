---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Esce dal processo di prelievo utilizzando il txHash di withdrawStartt.'
---

Il metodo `withdrawExit` può essere utilizzato per uscire dal processo di prelievo utilizzando txHash da `withdrawStart`.

**Nota**: la transazione withdrawStart deve essere sottoposta a checkpoint per poter uscire dal prelievo.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Questo metodo esegue più chiamate RPC per generare la prova e l'uscita dal processo. Pertanto ti consigliamo di utilizzare il metodo withdrawExitFaster.
>

