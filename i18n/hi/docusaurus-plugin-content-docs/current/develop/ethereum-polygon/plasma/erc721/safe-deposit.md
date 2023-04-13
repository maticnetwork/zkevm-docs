---
id: safe-deposit
title: safeDeposit
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# safeDeposit {#safedeposit}

`safeDeposit` मेथड एथेरेयम से पॉलीगॉन चेन में टोकन डिपाज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
