---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอน'
---

ใช้เมธอด `withdrawStartMany` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นจำนวนที่ระบุของหลายโทเค็นตามลำดับบนเชน Polygon

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
