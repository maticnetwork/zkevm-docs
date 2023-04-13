---
id: withdraw-exit
title: retirerSortir
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Quittez le processus de retrait en utilisant le txHash de « withdrawStart ».'
---

`withdrawExit`La méthode peut être utilisée pour quitter le processus de retrait en utilisant le txHash de la `withdrawStart`méthode.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Cette méthode effectue plusieurs appels RPC pour générer la preuve et traiter la sortie. C'est donc recommandé d'utiliser la méthode withdrawExitFaster.
>
