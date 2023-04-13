---
id: withdraw-start
title: वापस लेना शुरू करें
keywords:
- 'plasma client, erc721, withdrawStart, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# वापस लेना शुरू करें {#withdrawstart}

`withdrawStart` तरीका उस वापस लेने की प्रक्रिया को शुरू करने के लिए इस्तेमाल किया जा सकता है जिसमें पॉलीगॉन चेन पर विशेष टोकन बर्न किए जाएँगे.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
