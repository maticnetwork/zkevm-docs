---
id: deposit-ether
title: nạp ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'Nạp số lượng ether yêu cầu từ ethereum vào polygon.'
---

Có thể sử dụng phương pháp `depositEther` để nạp số lượng **ether** yêu cầu từ ethereum sang polygon.

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
