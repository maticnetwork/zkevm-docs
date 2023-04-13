---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก withdrawStart'
---

ใช้เมธอด `withdrawExitFaster` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStart`

ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณจำเป็นต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
