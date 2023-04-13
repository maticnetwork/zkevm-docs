---
id: withdraw-exit
title: retirer sortir
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# retirerSortir {#withdrawexit}

`withdrawExit`méthode peut être utilisée pour quitter le processus de retrait une fois que la période de défi est terminée.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
