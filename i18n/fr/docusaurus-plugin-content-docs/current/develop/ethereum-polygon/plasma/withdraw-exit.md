---
id: withdraw-exit
title: retirer sortir
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# retirerSortir {#withdrawexit}

En plasma, le processus de retrait  peut être  sorti par quiconque qui utilise `withdrawExit`méthode. Le processus de sortie ne fonctionnera qu'une fois la période de défi terminée.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Vous pouvez également quitter pour plusieurs jetons en fournissant la liste des jetons dans le tableau.
