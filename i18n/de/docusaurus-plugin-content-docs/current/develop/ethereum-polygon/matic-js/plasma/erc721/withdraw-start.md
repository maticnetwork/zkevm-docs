---
id: withdraw-start
title: withdrawStart
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Initiieren Sie den Abhebungsprozess'
---

Die `withdrawStart`-Methode kann angewandt werden, um den Abhebungsprozess zu starten, der den angegebenen Token auf die Polygon-Chain brennt.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
