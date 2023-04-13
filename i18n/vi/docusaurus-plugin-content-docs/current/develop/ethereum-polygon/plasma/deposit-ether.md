---
id: deposit-ether
title: nạp
keywords:
- 'plasma client, depositEther, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# depositEther {#depositether}

Có thể sử dụng phương pháp `depositEther` để nạp số lượng **ether** yêu cầu từ ethereum sang polygon.

```
const result = await plasmaClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
