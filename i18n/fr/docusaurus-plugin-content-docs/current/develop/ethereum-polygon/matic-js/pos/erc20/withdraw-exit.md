---
id: withdraw-exit
title: Suppression du retrait
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Supprimez le processus de retrait en utilisant le txHash de withdrawStart.'
---

`withdrawExit` la méthode peut être utilisée pour supprimer le processus de retrait en utilisant le txHash de`withdrawStart` la méthode.

**Remarque**- la transaction withdrawStart doit être contrôlée afin de supprimer le retrait.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Cette méthode effectue plusieurs appels RPC pour générer la preuve et traiter la suppression. C'est donc recommandé d'utiliser la méthode withdrawExitFaster.
>

