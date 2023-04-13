---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Auszahlung beenden {#withdrawexit}

Die `withdrawExit`-Methode kann angewandt werden, um den Auszahlungsvorgang zu beenden, nachdem die Einspruchsfrist abgelaufen ist.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
