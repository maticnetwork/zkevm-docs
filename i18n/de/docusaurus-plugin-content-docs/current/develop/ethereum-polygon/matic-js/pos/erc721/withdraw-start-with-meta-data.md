---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'Initiieren Sie den Abhebungsprozess mit Metadaten.'
---

`withdrawStartWithMetaData` Methode kann angewandt werden, um den Abhebungsprozess zu starten, der den angegebenen Token auf die Polygon-Chain brennt. Unter dem Hood wird `withdrawWithMetadata` Methode auf Token-Contract aufgerufen.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
