---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawExit {#withdrawexit}

In Plasma, il processo di prelievo può essere interrotto da qualunque utente che utilizzi il metodo `withdrawExit`. Il processo di uscita funziona solo dopo il completamento di un periodo di challenge.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Puoi anche eseguire l'uscita per più token, fornendo l'elenco di token sotto forma di array.
