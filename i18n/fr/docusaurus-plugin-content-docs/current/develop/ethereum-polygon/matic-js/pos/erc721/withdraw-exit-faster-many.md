---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Quittez le processus de retrait en utilisant le txHash de « withdrawStartMany ».'
---

`withdrawExitFasterMany` La méthode peut être utilisée pour quitter le processus de retrait en utilisant le txHash de la `withdrawStartMany`méthode.


C'est rapide, car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Remarque**- la transaction withdrawStart doit être contrôlée afin de sortir du retrait.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
