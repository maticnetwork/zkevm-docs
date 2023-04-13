---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# withdrawExit {#withdrawexit}

Der Plasma-Auszahlungsvorgang kann von jedem mit der `withdrawExit`-Methode beendet werden. Der Exit-Prozess funktioniert erst nach dem Ende der Einspruchsfrist.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Du kannst auch mehrere Token beenden, indem du die Tokenliste im Array bereitstellst.
