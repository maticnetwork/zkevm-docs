---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Lumabas sa proseso ng pag-withdraw nang mas mabilis gamit ang txHash mula sa withdrawStart.'
---

Maaaring gamitin ang paraang `withdrawExitFaster` upang lumabas sa proseso ng pag-withdraw nang mas mabilis sa pamamagitan ng paggamit sa txHash mula sa paraang `withdrawStart`.

Mabilis ito sa pangkalahatan dahil nag-ge-generate ito ng proof sa backend. Kailangan mong i-configure ang [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Tandaan**- ang transaksyon ng withdrawStart ay dapat i-checkpoint upang makalabas sa pag-withdraw.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Kapag kumpleto na ang transaksyon at nakumpleto ang checkpoint, idedeposito ang halaga sa root chain.
