---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

Die `withdrawExitFasterMany`-Methode kann angewandt werden, um alle Token freizugeben.

Das geht schnell, da der Nachweis im Backend generiert wird. Das Backend kann mit einem privaten RPC konfiguriert werden.

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
