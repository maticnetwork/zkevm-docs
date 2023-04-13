---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa `withdrawStartMany`.'
---

Maaaring gamitin ang paraang `withdrawExitFasterMany` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStartMany`.


Mabilis ito dahil nag-ge-generate ito ng proof sa backend. Kailangan mong i-configure ang [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Tandaan**- ang transaksyon ng withdrawStart ay dapat i-checkpoint upang makalabas sa pag-withdraw.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
