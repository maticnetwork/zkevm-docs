---
id: withdraw-confirm-faster
title: Schnellere Einsprache bei Auszahlung
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Einen Auszahlungsnachweis im Backend bestätigen.'
---

Die `withdrawConfirmFaster`-Methode ist der zweite Schritt der Plasma-Auszahlung. In diesem Schritt wird der Nachweis der Burn-Transaktion (erste Transaktion) übermittelt und ein erc721-Token mit dem entsprechenden Wert erstellt.

Nachdem dieser Vorgang erfolgreich abgeschlossen ist, beginnt die Beeinspruchungsfrist. Nach Ende der Beeinspruchungsfrist wird dem Benutzer der ausgezahlte Betrag auf seinem Konto in der Root-Chain gutgeschrieben.

Die Einsprachefrist für Mainnet beträgt 7 Tage.


Das geht schnell, da der Nachweis im Backend generiert wird. Sie müssen [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) konfigurieren,

**Beachten Sie,**- dass die withdrawStart-Transaktion einen Checkpoint passieren muss, damit gegen die Auszahlung Einsprache erhoben werden kann.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Nach Ende der Beeinspruchungsfrist kann `withdrawExit` aufgerufen werden, um den Auszahlungsvorgang zu beenden und den ausgezahlten Betrag zurückzubekommen.
