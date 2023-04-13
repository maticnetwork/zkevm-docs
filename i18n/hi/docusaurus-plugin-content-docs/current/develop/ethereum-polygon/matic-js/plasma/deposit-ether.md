---
id: deposit-ether
title: डिपाज़िट करें
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन में **एथेर** की ज़रूरी मात्रा डिपाज़िट करें.'
---

एथेरेयम से पॉलीगॉन में **एथेर** की ज़रूरी मात्रा डिपाज़िट करने के लिए `depositEther`तरीका इस्तेमाल किया जा सकता है.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
