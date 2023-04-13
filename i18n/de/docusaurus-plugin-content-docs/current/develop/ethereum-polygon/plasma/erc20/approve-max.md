---
id: approve-max
title: ApproveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Erste Schritte mit maticjs'
---

# ApproveMax {#approvemax}

Mit dieser `approveMax`-Methode kann der Maximalbetrag des Root-Tokens freigegeben werden.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
