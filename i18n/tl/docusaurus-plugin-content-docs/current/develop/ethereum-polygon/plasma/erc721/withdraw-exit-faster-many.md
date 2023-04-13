---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

Maaaring gamitin ang paraang `withdrawExitFasterMany` upang aprubahan ang lahat ng token.

Mabilis ito dahil nag-ge-generate ito ng proof sa backend. Maaaring i-configure ang backend gamit ang nakalaang pribadong rpc.

**Tandaan**- ang transaksyon ng withdrawStart ay dapat i-checkpoint upang makalabas sa pag-withdraw.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
