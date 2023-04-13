---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw gamit ang txHash mula sa withdrawStart.'
---

Maaaring gamitin ang paraang `withdrawExitFaster` upang lumabas sa proseso ng pag-withdraw sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStart`.

Mabilis ito dahil nag-ge-generate ito ng proof sa backend. Kailangan mong i-configure ang [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Tandaan**- ang transaksyon ng withdrawStart ay dapat i-checkpoint upang makalabas sa pag-withdraw.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
