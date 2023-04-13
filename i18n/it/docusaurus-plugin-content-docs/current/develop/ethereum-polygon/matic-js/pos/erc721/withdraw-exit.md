---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Esce dal processo di prelievo utilizzando il txHash di `withdrawStart`.'
---

Il metodo `withdrawExit` può essere utilizzato per uscire dal processo di prelievo utilizzando il txHash di `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Questo metodo esegue più chiamate RPC per generare la prova e l'uscita dal processo. Pertanto ti consigliamo di utilizzare il metodo withdrawExitFaster.
>
