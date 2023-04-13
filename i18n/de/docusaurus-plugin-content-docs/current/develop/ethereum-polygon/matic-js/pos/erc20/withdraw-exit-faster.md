---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Den Auszahlungsprozess schneller verlassen mit Hilfe von txHash aus withdrawStart.'
---

`withdrawExitFaster` Methode kann verwendet werden, um den Auszahlungsprozess mit Hilfe von txHash aus der `withdrawStart` Methode schneller zu beenden.

Das geht generell schnell, da der Nachweis im Backend generiert wird. Du musst [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) konfigurieren,

**Hinweis** – Die withdrawStart-Transaktion muss einen Checkpoint passieren, um die Auszahlung zu beenden.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Sobald die Transaktion und der Checkpoint abgeschlossen ist, wird der Betrag an die Root-Chain eingezahlt.
