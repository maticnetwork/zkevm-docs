---
id: approve-max
title: approveMax
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# approveMax {#approvemax}

ใช้เมธอด `approveMax` เพื่ออนุมัติจำนวนสูงสุดบนโทเค็นต้นทางได้

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
