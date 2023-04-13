---
id: withdraw-start-with-meta-data
title: मेटा डेटा से निकासी प्रारंभ करें
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'मेटाडाटा के साथ निकासी प्रक्रिया शुरू करें.'
---

`withdrawStartWithMetaData` तरीका उस वापस लेने की प्रक्रिया को शुरू करने के लिए इस्तेमाल किया जा सकता है जिसमें पॉलीगॉन चेन पर विशेष टोकन बर्न किए जाएँगे. हुड के तहत यह टोकन अनुबंध पर `withdrawWithMetadata`विधि कहता है.


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
