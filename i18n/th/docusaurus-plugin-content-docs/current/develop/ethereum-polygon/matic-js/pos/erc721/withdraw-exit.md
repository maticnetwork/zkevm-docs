---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก "withdrawStart"'
---

ใช้เมธอด `withdrawExit` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStart`

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


เมธอดนี้เรียก RPC หลายครั้งเพื่อสร้างหลักฐานและออกจากกระบวนการดังนั้น ขอแนะนำให้ใช้เมธอด withdrawExitFaster
>
