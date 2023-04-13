---
id: withdraw-exit-faster
title: supprimer le retrait plus rapidement
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Supprimez le processus de retrait plus rapidement en utilisant le txHash de withdrawStart.'
---

`withdrawExitFaster` la méthode peut être utilisée pour supprimer le processus du retrait plus rapidement en utilisant le txHash de `withdrawStart` la méthode.

C'est généralement rapide, car cela génère la preuve dans le backend. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Remarque**- la transaction withdrawStart doit être contrôlée afin de supprimer le retrait.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Une fois que la transaction est terminée et que le point de contrôle est fermé, le montant sera déposé sur la chaîne root.
