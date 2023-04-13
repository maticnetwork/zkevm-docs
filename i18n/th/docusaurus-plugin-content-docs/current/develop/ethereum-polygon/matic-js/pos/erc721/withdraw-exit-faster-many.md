---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก "withdrawStartMany"'
---

ใช้เมธอด `withdrawExitFasterMany` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStartMany`


ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณจำเป็นต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
