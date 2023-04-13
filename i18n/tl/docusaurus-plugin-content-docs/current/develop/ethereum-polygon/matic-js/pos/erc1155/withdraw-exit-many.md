---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa withdrawStart.'
---

Maaaring gamitin ang paraang `withdrawExitMany` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
