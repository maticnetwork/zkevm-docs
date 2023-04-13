---
id: approve
title: approve
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# approve {#approve}

ใช้เมธอด `approve` เพื่ออนุมัติจำนวนที่ต้องการบนโทเค็นต้นทางได้

ต้องใช้ approve เพื่อฝากยอดบนเชน Polygon

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
