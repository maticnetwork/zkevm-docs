---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc721, withdrawExitFaster, polygon, sdk'
description: 'ออกจากกระบวนการถอนโดยใช้ txHash จาก "withdrawStart"'
---

ใช้เมธอด `withdrawExitFaster` เพื่อออกจากกระบวนการถอนโดยใช้ txHash จากเมธอด `withdrawStart`


ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์คุณจำเป็นต้องกำหนดค่า [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api)

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
