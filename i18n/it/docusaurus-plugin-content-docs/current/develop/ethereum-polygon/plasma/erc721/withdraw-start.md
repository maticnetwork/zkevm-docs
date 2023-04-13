---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# withdrawStart {#withdrawstart}

`withdrawStart` può essere utilizzato per avviare il processo di prelievo, che esegue il burn del token specificato sulla catena di Polygon.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
