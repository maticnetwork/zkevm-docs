---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa `withdrawStartMany`'
---

Maaaring gamitin ang paraang `withdrawExitMany` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
