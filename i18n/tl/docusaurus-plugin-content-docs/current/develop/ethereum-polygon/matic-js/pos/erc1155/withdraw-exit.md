---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa withdrawStart.'
---

Maaaring gamitin ang paraang `withdrawExit` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStart`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
