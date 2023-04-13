---
id: withdraw-start
title: निकालना शुरू करें
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'निकालने की प्रक्रिया शुरू करें.'
---

`withdrawStart` तरीके का इस्तेमाल निकालने की प्रक्रिया शुरू करने के लिए किया जा सकता है जो पॉलीगॉन चेन पर रकम की बताई गई मात्रा बर्न कर देता है.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

मिले ट्रैंज़ैक्शन हैश का इस्तेमाल निकालने की प्रक्रिया से बाहर निकलने के लिए किया जाएगा. तो हम इसे स्टोर करने की सिफ़ारिश करते हैं.

