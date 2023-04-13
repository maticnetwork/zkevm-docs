---
id: safe-deposit
title: सुरक्षित डिपॉज़िट
keywords:
- 'plasma client, erc721, deplasmait, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन चेन पर कोई टोकन डिपॉज़िट करें.'
---

`safeDeposit` तरीका एथेरेयम से पॉलीगॉन चेन में टोकन डिपॉज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
