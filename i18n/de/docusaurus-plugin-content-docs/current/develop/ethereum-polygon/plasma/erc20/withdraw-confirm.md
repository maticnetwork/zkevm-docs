---
id: withdraw-confirm
title: Auszahlung beeinspruchen
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Auszahlung bestätigen {#withdrawconfirm}

Die `withdrawConfirm`-Methode ist der zweite Schritt des Plasma-Auszahlungsvorgangs. In diesem Schritt wird der Nachweis der Burn-Transaktion (erste Transaktion) übermittelt und ein erc721-Token mit dem entsprechenden Wert erstellt.

Nachdem dieser Vorgang abgeschlossen ist, beginnt der Beeinspruchungszeitraum. Nach Ende des Beeinspruchungszeitraums kann sich der Benutzer den ausgezahlten Betrag auf sein Konto in der Root-Chain auszahlen lassen.

Die Beeinspruchungsfrist für Mainnet beträgt 7 Tage.

**Beachten Sie,**- dass die withdrawStart-Transaktion einen Checkpoint passieren muss, damit die Auszahlung beeinsprucht werden kann.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Nach Ende der Beeinspruchungsfrist kann `withdrawExit` aufgerufen werden, um den Auszahlungsvorgang zu beenden und den ausgezahlten Betrag zurückzubekommen.
