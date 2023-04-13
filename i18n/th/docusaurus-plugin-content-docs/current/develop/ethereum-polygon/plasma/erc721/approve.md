---
id: approve
title: approve
keywords:
- 'plasma client, erc721, approve, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# approve {#approve}

ใช้เมธอด `approve` เพื่ออนุมัติจำนวนที่ต้องการบนโทเค็นต้นทางได้

```
const erc721RootToken = plasmaClient.erc721(<root token address>,true);

const approveResult = await erc721RootToken.approve(<token id>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
