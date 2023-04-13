---
id: withdraw-exit-faster
title: WithdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Den Auszahlungsprozess mit txHash aus withdrawStart verlassen.'
---

`withdrawExitFaster` Methode kann verwendet werden, um die Auszahlungsprozess mit Hilfe von txHash aus der Methode `withdrawStart` zu verlassen.

Das geht schnell, da der Nachweis im Backend generiert wird. Sie müssen [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) konfigurieren.

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
