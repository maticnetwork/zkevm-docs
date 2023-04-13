---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Consente di avviare il processo di prelievo.'
---

Il metodo `withdrawStartMany` può essere utilizzato per avviare il processo di prelievo che brucerà gli importi specificati di token multipli direttamente sulla catena polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
