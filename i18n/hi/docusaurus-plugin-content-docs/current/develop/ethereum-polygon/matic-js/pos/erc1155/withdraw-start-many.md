---
id: withdraw-start-many
title: कई निकालना शुरू करें
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'निकालने की प्रक्रिया शुरू करें.'
---

`withdrawStartMany`तरीके का उपयोग वापस लेने की प्रक्रिया शुरू करने के लिए किया जा सकता है जो पॉलीगॉन चेन पर क्रमशः कई टोकन की निर्दिष्ट मात्रा को बर्न करे देगा.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
