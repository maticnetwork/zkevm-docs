---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'निकालने की प्रक्रिया शुरू करें.'
---

`withdrawStart` तरीके का इस्तेमाल निकालने की प्रक्रिया को शुरू करने के लिए किया जा सकता है जो पॉलीगॉन चेन पर टोकन आईडी की विशेष रकम को बर्न कर देगा.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
