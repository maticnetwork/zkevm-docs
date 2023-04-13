---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Initiiere den Auszahlungsprozess'
---

`withdrawStart`-Methode kann angewandt werden, um den Auszahlungsvorgang zu starten, der die vorgegebene Anzahl an TokenID auf die Polygon-Chain brennt.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
