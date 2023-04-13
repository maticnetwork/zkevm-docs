---
id: deposit-ether
title: डिपाज़िट करें
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# depositEther {#depositether}

एथेरेयम से **ईथर** की ज़रूरी रकम को पॉलीगॉन में डिपाज़िट करने के लिए`depositEther` मेथड इस्तेमाल किया जा सकता है..

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
