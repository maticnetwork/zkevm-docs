---
id: withdraw-exit
title: Sortie du retrait
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Quitter le processus de retrait'
---

En plasma, le processus de retrait peut être sorti par quiconque qui utilise la `withdrawExit`méthode. Le processus de sortie ne fonctionnera qu'une fois la période de défi terminée.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Vous pouvez également quitter pour plusieurs jetons en fournissant la liste des jetons dans le tableau.
