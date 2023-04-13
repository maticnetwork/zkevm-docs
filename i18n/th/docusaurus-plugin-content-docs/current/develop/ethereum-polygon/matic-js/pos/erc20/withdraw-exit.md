---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก withdrawStart'
---

ใช้เมธอด `withdrawExit` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStart`

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


เมธอดนี้เรียก RPC หลายครั้งเพื่อสร้างหลักฐานและออกจากกระบวนการดังนั้น ขอแนะนำให้ใช้เมธอด withdrawExitFaster
>

