---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# withdrawExit {#withdrawexit}

ใช้เมธอด `withdrawExit` เพื่อออกจากกระบวนการถอนได้ เมื่อสิ้นสุดระยะเวลาการคัดค้านแล้ว

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
