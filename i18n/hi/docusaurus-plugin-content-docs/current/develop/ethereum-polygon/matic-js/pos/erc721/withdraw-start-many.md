---
id: withdraw-start-many
title: कई निकालना शुरू करें
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'निकालने की प्रक्रिया शुरू करें.'
---

`withdrawStartMany` तरीका उस निकालने की प्रक्रिया को शुरू करने के लिए इस्तेमाल किया जा सकता है जिसमें पॉलीगॉन चेन पर कई टोकन बर्न किए जाएँगे.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
