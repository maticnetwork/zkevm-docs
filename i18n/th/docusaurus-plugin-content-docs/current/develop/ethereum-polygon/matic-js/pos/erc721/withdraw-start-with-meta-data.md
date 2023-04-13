---
id: withdraw-start-with-meta-data
title: withdrawStartWithMetaData
keywords:
- 'pos client, erc721, withdrawStartWithMetaData, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอนด้วยข้อมูลเมตา'
---

ใช้เมธอด `withdrawStartWithMetaData` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นโทเค็นที่ระบุบนเชน Polygonโดยจะเรียกเมธอด `withdrawWithMetadata` เป็นการภายในกับสัญญาโทเค็น


```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.withdrawStartWithMetaData(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
