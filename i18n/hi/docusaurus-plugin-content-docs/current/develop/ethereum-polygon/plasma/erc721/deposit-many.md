---
id: deposit-many
title: कईयों को प्लाज़्मा रहित करें
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# कईयों को प्लाज़्मा रहित करें {#deplasmaitmany}

`deplasmaitMany`तरीका एथेरेयम से पॉलीगॉन चेन में कई टोकन को प्लाज़्मा रहित करने के लिए इस्तेमाल किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
