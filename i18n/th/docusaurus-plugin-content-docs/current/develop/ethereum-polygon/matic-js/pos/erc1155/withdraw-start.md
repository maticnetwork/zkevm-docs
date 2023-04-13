---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอน'
---

ใช้เมธอด `withdrawStart` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นจำนวนที่ระบุของ tokenId บนเชน Polygon

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
