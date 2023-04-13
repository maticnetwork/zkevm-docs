---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
  - 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Get started with maticjs'
---

# withdrawExitFaster

`withdrawExitFaster` method can be used to approve all tokens.

It is fast because it generates proof in backend. The backend can be configured with dedicated private rpc.

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
