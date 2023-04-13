---
id: deposit
title: डिपाज़िट करें
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन चेन को कोई टोकन डिपॉज़िट करें.'
---

`deposit` तरीका एथेरेयम से पॉलीगॉन चेन में टोकन डिपॉज़िट करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
