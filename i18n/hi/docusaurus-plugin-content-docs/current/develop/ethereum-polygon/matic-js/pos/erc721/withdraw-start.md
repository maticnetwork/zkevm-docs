---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'निकासी की प्रक्रिया शुरू करें.'
---

`withdrawStart` मेथड उस निकासी की प्रक्रिया को शुरू करने के लिए इस्तेमाल किया जा सकता है जिसमें पॉलीगॉन चेन पर निर्दिष्ट किए गए टोकन बर्न किए जाएँगे.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
