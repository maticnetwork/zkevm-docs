---
id: withdraw-confirm
title: WithdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Auszahlung bestätigen.'
---

Die `withdrawConfirm`-Methode ist der zweite Schritt des Plasma-Auszahlungsvorgangs. In diesem Schritt wird der Nachweis der Löschtransaktion (erste Transaktion) übermittelt und ein erc721-Token mit dem entsprechenden Wert erstellt.

Nachdem dieser Vorgang erfolgreich abgeschlossen ist, beginnt die Einspruchsfrist. Nach Ende der Einspruchsfrist wird dem Benutzer der ausgezahlte Betrag auf seinem Konto in der Root-Chain gutgeschrieben.

Die Einspruchsfrist für Mainnet beträgt 7 Tage.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
