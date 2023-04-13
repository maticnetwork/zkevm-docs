---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Avvia il processo di prelievo.'
---

Il metodo `withdrawStart` può essere utilizzato per avviare il processo di prelievo, che brucia l'importo specificato sul token figlio.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

memorizzare il txHash, che sarà utilizzato per il challenge del processo di prelievo.
