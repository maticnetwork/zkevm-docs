---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Avvia il processo di prelievo.'
---

Il metodo `withdrawStart` può essere utilizzato per avviare il processo di prelievo che brucerà l'importo specificato sulla catena di polygon.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

L'hash ricevuto per la transazione verrà utilizzato per uscire dal processo di prelievo. Quindi ti consigliamo di conservarlo.

