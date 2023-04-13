---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'maticjs से शुरूआत करें'
---

# approveMax {#approvemax}

`approveMax` तरीके का उपयोग रूट टोकन पर मैक्स रकम मंज़ूर करने के लिए किया जा सकता है.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
