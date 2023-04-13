---
id: withdraw-start
title: Auszahlung einleiten
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Initiiere den Auszahlungsprozess'
---

Die `withdrawStart`-Methode kann angewandt werden, um den Auszahlungsvorgang zu starten, der den angegebenen Betrag auf die Polygon-Chain brennen wird.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Der empfangene Transaktion-Hash wird verwendet, um den Auszahlungsvorgang zu beenden. Deshalb empfehlen wir, diesen zu speichern.

