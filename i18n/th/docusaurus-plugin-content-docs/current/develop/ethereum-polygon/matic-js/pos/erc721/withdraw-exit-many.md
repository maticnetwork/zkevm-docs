---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก "withdrawStartMany"'
---

ใช้เมธอด `withdrawExitMany` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStartMany`

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
