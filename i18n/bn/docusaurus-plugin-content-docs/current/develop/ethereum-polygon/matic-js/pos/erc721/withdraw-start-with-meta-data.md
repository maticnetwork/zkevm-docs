---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'মেটাডাটার মাধ্যমে উইথড্র প্রক্রিয়া শুরু করে।'
---

উইথড্র প্রক্রিয়া শুরু করার জন্য `withdrawStartWithMetaData` পদ্ধতি ব্যবহার করা যেতে পারে যেখানে Polygon চেইনে নির্দিষ্ট টোকেনটি বার্ন করবে। অভ্যন্তরীণভাবে একে টোকেন চুক্তি বিষয়ে `withdrawWithMetadata` পদ্ধতি বলা হয়।


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
