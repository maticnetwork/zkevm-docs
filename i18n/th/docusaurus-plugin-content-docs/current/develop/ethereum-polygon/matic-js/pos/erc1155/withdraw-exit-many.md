---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก withdrawStart'
---

ใช้เมธอด `withdrawExitMany` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStartMany`

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
