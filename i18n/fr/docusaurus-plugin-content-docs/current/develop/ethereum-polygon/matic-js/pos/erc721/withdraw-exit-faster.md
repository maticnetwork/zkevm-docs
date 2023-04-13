---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Quittez le processus de retrait en utilisant le txHash de « withdrawStart ».'
---

`withdrawExitFaster`La méthode peut être utilisée pour quitter le processus de retrait en utilisant le txHash de la`withdrawStart`méthode.


C'est rapide, car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Remarque**- la transaction withdrawStart doit être contrôlée afin de sortir du retrait.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
