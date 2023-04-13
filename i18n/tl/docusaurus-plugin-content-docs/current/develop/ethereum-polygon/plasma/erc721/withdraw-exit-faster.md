---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Magsimula sa maticjs '
---

# withdrawExitFaster {#withdrawexitfaster}

Maaaring gamitin ang paraang `withdrawExitFaster`upang aprubahan ang lahat ng token.

Mabilis ito dahil nag-ge-generate ito ng proof sa backend. Maaaring i-configure ang backend gamit ang nakalaang pribadong rpc.

**Tandaan**- ang transaksyon ng withdrawStart ay dapat i-checkpoint upang makalabas sa pag-withdraw.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
