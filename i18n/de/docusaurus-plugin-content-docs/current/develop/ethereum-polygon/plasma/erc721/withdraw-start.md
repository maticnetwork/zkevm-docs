---
id: withdraw-start
title: Auszahlung starten
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Auszahlung starten {#withdrawstart}

Die `withdrawStart`-Methode kann angewandt werden, um den Auszahlungsvorgang zu starten, mit dem der angegebene Token auf die Polygon-Chain ausgeschieden wird.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
