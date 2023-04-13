---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc1155, withdrawExit, polygon, sdk'
description:  'ออกจากกระบวนการถอนโดยใช้ txHash จาก withdrawStart'
---

ใช้เมธอด `withdrawExit` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStart`

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
