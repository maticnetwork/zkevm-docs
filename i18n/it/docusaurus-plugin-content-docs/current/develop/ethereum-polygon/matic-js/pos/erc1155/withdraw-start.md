---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Avvia il processo di prelievo.'
---

Il metodo `withdrawStart` può essere utilizzato per avviare il processo di prelievo che brucerà l'importo specificato di tokenId sulla catena di polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
