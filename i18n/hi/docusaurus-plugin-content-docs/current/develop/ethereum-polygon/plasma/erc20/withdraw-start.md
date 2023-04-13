---
id: withdraw-start
title: निकालना शुरू करें
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'maticjs से शुरूआत करें'
---

# वापस लेना शुरू करें {#withdrawstart}

`withdrawStart` तरीके का इस्तेमाल निकालने की प्रक्रिया शुरू करने के लिए किया जा सकता है जो चाइल्ड टोकन पर रकम की निर्दिष्ट मात्रा बर्न कर देता है.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

txHash को स्टोर करें जिसका उपयोग निकासी प्रक्रिया को चुनौती देने के लिए किया जाएगा.
