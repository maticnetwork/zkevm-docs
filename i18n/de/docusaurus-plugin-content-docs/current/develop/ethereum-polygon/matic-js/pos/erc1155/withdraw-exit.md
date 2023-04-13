---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Den Auszahlungsprozess mit txHash aus withdrawStart verlassen.'
---

`withdrawExit` Methode kann verwendet werden, um die Auszahlungsprozess mit Hilfe von txHash aus der Methode `withdrawStart` zu verlassen.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
