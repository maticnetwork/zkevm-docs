---
id: withdraw-exit
title: Auszahlung beenden
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Den Abhebungsprozess beenden.'
---

Die `withdrawExit`-Methode kann angewandt werden, um den Abhebungsprozess zu beenden, nachdem der Anfechtungszeitraum abgelaufen ist.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
