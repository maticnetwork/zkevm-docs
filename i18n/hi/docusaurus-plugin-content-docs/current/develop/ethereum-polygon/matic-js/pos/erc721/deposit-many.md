---
id: deposit-many
title: depositMany (कई डिपॉज़िट करें)
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन चेन में कई टोकन डिपॉज़िट करें.'
---

एथेरेयम से पॉलीगॉन चेन में कई टोकन डिपाज़िट करने के लिए `depositMany`तरीके का इस्तेमाल किया जा सकता है.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
