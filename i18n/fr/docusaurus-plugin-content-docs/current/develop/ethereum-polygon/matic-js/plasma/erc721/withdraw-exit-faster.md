---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Sortir du processus de retrait.'
---

`withdrawExitFaster`la méthode peut être utilisée pour approuver tous les jetons.

C'est rapide car cela génère la preuve en arrière plan. L'arrière-plan peut être configuré avec un rpc (appels de procédure à distance) privé dédié.

**Remarque**- la transaction withdrawStart doit être contrôlée afin de supprimer le retrait.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
