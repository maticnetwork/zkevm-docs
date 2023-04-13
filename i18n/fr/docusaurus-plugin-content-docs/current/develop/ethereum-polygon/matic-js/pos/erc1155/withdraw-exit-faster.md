---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Sortez du processus de retrait en utilisant le txHash de withdrawStart.'
---

`withdrawExitFaster`la méthode peut être utilisée pour sortir du processus de retrait en utilisant le txHash de la méthode `withdrawStart`.

C'est rapide, car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Remarque**- la transaction withdrawStart doit être contrôlée afin de sortir du retrait.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
