---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'Sortez du processus de retrait en utilisant le txHash de withdrawStartMany.'
---

`withdrawExitFasterMany`la méthode peut être utilisée pour sortir du processus de retrait en utilisant le txHash de la méthode `withdrawStartMany`.

C'est rapide, car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).


**Remarque**- la transaction withdrawStart doit être contrôlée afin de sortir du retrait.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
