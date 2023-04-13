---
id: approve-max
title: मैक्स स्वीकृत करें
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'रूट टोकन पर मैक्स राशि स्वीकृत करें.'
---

`approveMax`तरीके का उपयोग रूट टोकन पर मैक्स राशि स्वीकृत करने के लिए किया जा सकता है.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
