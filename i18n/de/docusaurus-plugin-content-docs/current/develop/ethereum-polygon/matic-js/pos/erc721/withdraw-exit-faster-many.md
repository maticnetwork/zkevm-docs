---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Den Auszahlungsprozess mit Hilfe von txHash aus `withdrawStartMany` verlassen'
---

`withdrawExitFasterMany` Methode kann verwendet werden, um den Auszahlungsprozess mit Hilfe von txHash aus der Methode `withdrawStartMany` zu verlassen.


Das geht schnell, da der Nachweis im Backend generiert wird. Sie müssen [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) konfigurieren.

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
