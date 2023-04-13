---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Supprimez le processus de retrait en utilisant le txHash de withdrawStart.'
---

`withdrawExitMany`la méthode peut être utilisée pour supprimer le processus de retrait en utilisant le txHash de la méthode`withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
