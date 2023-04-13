---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Avvia il processo di prelievo con i metadati.'
---

Il metodo `withdrawStartWithMetaData` può essere utilizzato per avviare il processo di prelievo che brucerà il token specificato sulla catena di polygon. Dietro le quinte chiama il metodo `withdrawWithMetadata` sul contratto token.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
