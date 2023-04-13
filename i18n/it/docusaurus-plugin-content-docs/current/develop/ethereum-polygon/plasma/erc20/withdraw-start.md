---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Il metodo withdrawStart {#withdrawstart}

`withdrawStart` può essere utilizzato per avviare il processo di prelievo, che effettua il burn dell'importo specificato sul token figlio.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

memorizzare il txHash, che sarà utilizzato per il challenge del processo di prelievo.
