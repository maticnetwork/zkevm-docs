---
id: withdraw-start
title: withdraw start
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'เริ่มต้นกระบวนการถอน'
---

ใช้เมธอด `withdrawStart` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นจำนวนที่ระบุบนเชน Polygon

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

โดยจะใช้แฮชธุรกรรมที่ได้รับเพื่อออกจากกระบวนการถอนดังนั้น ขอแนะนำให้เก็บเอาไว้

