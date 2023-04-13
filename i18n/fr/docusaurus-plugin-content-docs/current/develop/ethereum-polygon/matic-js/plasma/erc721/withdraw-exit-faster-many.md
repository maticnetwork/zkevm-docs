---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

`withdrawExitFasterMany` la méthode peut être utilisée pour approuver tous les jetons.

C'est rapide car cela génère la preuve en arrière plan. L'arrière-plan peut être configuré avec un rpc (appels de procédure à distance) privé dédié.

**Remarque**- la transaction withdrawStart doit être contrôlée afin de supprimer le retrait.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
