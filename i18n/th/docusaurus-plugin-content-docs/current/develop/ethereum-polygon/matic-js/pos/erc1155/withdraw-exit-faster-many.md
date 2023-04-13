---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก withdrawStartMany'
---

ใช้เมธอด `withdrawExitFasterMany` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStartMany`

ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณจำเป็นต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)


**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
