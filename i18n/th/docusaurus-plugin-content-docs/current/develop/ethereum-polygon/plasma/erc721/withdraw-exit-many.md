---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'plasma client, erc721, withdrawExitMany, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawExitMany {#withdrawexitmany}

ใช้เมธอด `withdrawExitMany` เพื่ออนุมัติโทเค็นทั้งหมดได้

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
