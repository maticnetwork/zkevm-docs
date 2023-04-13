---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# approveMax {#approvemax}

Maaaring gamitin ang paraang `approveMax` upang aprubahan ang max na halaga sa root token.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
