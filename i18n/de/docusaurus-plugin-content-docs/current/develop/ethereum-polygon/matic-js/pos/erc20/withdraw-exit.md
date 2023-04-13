---
id: withdraw-exit
title: Auszahlung beenden
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Den Auszahlungsprozess mit txHash aus withdrawStart verlassen.'
---

`withdrawExit` Methode kann verwendet werden, um die Auszahlungsprozess mit Hilfe von txHash aus der Methode `withdrawStart` zu verlassen.

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Diese Methode führt mehrere RPC-Aufrufe aus, um den Nachweis und Ausgang aus dem Prozess zu generieren. Daher wird empfohlen, die Methode withdrawExitFaster zu verwenden.
>

