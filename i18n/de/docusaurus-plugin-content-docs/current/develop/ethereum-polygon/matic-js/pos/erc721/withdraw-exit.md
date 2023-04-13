---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Beenden Sie den Abhebungsprozess mit Hilfe des txHash aus `WithdrawStart`'
---

`withdrawExit` Methode kann verwendet werden, um den Abhebungsprozess mit Hilfe von txHash aus der Methode `withdrawStart` zu beenden.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Diese Methode führt mehrere RPC-Aufrufe aus, um den Nachweis und Ausgang aus dem Prozess zu generieren. Daher wird empfohlen, die Methode withdrawExitFaster zu verwenden.
>
