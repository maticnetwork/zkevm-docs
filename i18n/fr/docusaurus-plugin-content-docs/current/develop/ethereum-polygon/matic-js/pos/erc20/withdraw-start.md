---
id: withdraw-start
title: début du retrait
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Lancer le processus de retrait.'
---

`withdrawStart` la méthode  peut être utilisée pour lancer le processus de retrait qui brûlera le montant spécifié sur la chaîne polygone.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

L'identifiant de la transaction reçue sera utilisé pour supprimer le processus de retrait. Nous vous recommandons donc de le stocker.

