---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอน'
---

ใช้เมธอด `withdrawStart` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นโทเค็นที่ระบุบนเชน Polygon

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
