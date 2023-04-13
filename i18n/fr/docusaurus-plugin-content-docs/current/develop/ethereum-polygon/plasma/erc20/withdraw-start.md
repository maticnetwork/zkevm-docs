---
id: withdraw-start
title: Retirer commencer
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# retirerCommencer {#withdrawstart}

`withdrawStart`méthode peut être utilisée pour lancer le processus de retrait qui brûlera le montant spécifié sur le jeton enfant.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

stocker le txHash qui sera utilisé pour défier le processus de retrait.
