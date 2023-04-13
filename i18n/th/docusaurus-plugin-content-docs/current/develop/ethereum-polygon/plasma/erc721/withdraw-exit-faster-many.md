---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'plasma client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawExitFasterMany {#withdrawexitfastermany}

ใช้เมธอด `withdrawExitFasterMany` เพื่ออนุมัติโทเค็นทั้งหมดได้

ซึ่งมีความรวดเร็วเพราะสร้างหลักฐานในแบ็คเอนด์กำหนดค่าพื้นหลังด้วย RPC ส่วนตัวโดยเฉพาะ

**หมายเหตุ** - ธุรกรรม withdrawStart จะต้องผ่านเช็คพอยต์เพื่อออกจากการถอน

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
