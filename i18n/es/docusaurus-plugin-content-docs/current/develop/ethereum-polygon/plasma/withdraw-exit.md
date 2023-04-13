---
id: withdraw-exit
title: withdraw exit (Salida del retiro)
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Empieza con Matic.js'
---

# withdrawExit (Salida del retiro) {#withdrawexit}

En Plasma, cualquiera puede salir del proceso de retiro usando el método `withdrawExit`. El proceso de salida funcionará solo después de que se haya finalizado el período de reclamos.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

También puedes salir para múltiples tokens mediante el suministro de una lista de tokens en grupo.
