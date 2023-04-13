---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Quittez le processus de retrait en utilisant le txHash de « withdrawStartMany ».'
---

`withdrawExitMany`La méthode peut être utilisée pour quitter le processus de retrait en utilisant le txHash de la `withdrawStartMany`méthode.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
