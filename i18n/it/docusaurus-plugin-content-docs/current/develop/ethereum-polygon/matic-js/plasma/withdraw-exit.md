---
id: withdraw-exit
title: withdrawExit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Esce dal processo di prelievo.'
---

In Plasma, chiunque può uscire dal processo di prelievo utilizzando il metodo `withdrawExit`. Il processo di uscita funziona solo dopo il completamento di un periodo di challenge.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Puoi anche eseguire l'uscita per più token, fornendo l'elenco di token sotto forma di array.
