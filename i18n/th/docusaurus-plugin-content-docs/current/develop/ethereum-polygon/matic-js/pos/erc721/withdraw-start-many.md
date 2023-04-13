---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอน'
---

ใช้เมธอด `withdrawStartMany` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นหลายโทเค็นบนเชน Polygon

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
