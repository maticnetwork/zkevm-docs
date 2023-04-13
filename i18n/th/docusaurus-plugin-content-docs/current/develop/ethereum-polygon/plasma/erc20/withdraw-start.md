---
id: withdraw-start
title: withdraw start
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawStart {#withdrawstart}

ใช้เมธอด `withdrawStart` เพื่อเริ่มต้นกระบวนการถอนได้ ซึ่งจะเบิร์นจำนวนที่ระบุบนโทเค็นย่อย

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

จัดเก็บ txHash ซึ่งจะใช้เพื่อคัดค้านกระบวนการถอน
