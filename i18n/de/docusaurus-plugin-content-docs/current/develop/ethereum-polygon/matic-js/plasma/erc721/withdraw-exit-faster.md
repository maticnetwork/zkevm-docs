---
id: withdraw-exit-faster
title: WithdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Den Auszahlungsvorgang beenden.'
---

Die `withdrawExitFaster`-Methode kann angewandt werden, um alle Token freizugeben.

Das geht schnell, da der Nachweis im Backend generiert wird. Das Backend kann mit einem privaten RPC konfiguriert werden.

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
