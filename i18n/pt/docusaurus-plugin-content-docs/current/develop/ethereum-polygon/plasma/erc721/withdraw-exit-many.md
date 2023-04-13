---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'Introdução ao maticjs'
---

# withdrawExitMany {#withdrawexitmany}

O método `withdrawExitMany` pode ser usado para aprovar todos os tokens.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
