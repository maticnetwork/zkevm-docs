---
id: withdraw-exit
title: Auszahlung beenden
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Auszahlungsvorgang beenden.'
---

Der Plasma-Auszahlungsvorgang kann von jedem beendet werden, der die `withdrawExit`-Methode nutzt. Der Exit-Prozess funktioniert erst nach dem Ende der Einspruchsfrist.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Du kannst auch mehrere Token beenden, indem du die Tokenliste im Array bereitstellst.
