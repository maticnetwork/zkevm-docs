---
id: withdraw-exit-many
title: WithdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# WithdrawExitMany {#withdrawexitmany}

Die `withdrawExitMany`-Methode kann angewandt werden, um alle Token zu genehmigen.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
