---
id: deposit-ether
title: एथेर डिपॉज़िट करें
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन में एथेर की ज़रूरी मात्रा डिपाज़िट करें.'
---

एथेरेयम से पॉलीगॉन में **एथेर** की ज़रूरी मात्रा डिपाज़िट करने के लिए `depositEther`तरीका इस्तेमाल किया जा सकता है.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
