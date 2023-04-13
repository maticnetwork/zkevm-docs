---
id: deposit-ether
title: deposit
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# depositEther {#depositether}

ใช้เมธอด `depositEther` เพื่อฝาก **Ether** ในจำนวนที่ต้องการจาก Ethereum ไปยัง Polygon ได้


```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
