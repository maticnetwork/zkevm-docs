---
id: withdraw-exit-many
title: WithdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Beende den Auszahlungsprozess mit txHash aus `withdrawStartMany`'
---

`withdrawExitMany` Methode kann verwendet werden, um die Auszahlungsprozess mit Hilfe von txHash aus der Methode `withdrawStartMany` zu beenden.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
