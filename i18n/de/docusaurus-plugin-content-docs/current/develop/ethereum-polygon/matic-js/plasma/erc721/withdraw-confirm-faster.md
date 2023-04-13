---
id: withdraw-confirm-faster
title: WithdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Auszahlung mit Erzeugung des Nachweises im Backend bestätigen.'
---

`withdrawConfirmFaster`-Methode ist der zweite Schritt des Plasma-Auszahlungsvorgangs. In diesem Schritt wird der Nachweis der Löschtransaktion (erste Transaktion) übermittelt und ein erc721-Token mit dem entsprechenden Wert erstellt.

Nachdem dieser Vorgang erfolgreich abgeschlossen ist, beginnt die Einspruchsfrist. Nach Ende der Einspruchsfrist wird dem Benutzer der ausgezahlte Betrag auf seinem Konto in der Root-Chain gutgeschrieben.

Die Einspruchsfrist für Mainnet beträgt 7 Tage.

Das geht schnell, da der Nachweis im Backend generiert wird. Du musst [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) konfigurieren,

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
