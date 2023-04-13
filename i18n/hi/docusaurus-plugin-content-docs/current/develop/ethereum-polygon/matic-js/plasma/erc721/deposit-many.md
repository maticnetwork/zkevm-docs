---
id: deposit-many
title: कई को प्लाज़्मा रहित करें
keywords:
- 'plasma client, erc721, deplasmaitMany, polygon, sdk'
description: 'एथेरेयम से पॉलीगॉन चेन में कई टोकन डिपॉज़िट करें.'
---

`deplasmaitMany`विधि का उपयोग एथेरेयम से पॉलीगॉन चेन में कई टोकन डिपाज़िट करने के लिए किया जा सकता है.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
