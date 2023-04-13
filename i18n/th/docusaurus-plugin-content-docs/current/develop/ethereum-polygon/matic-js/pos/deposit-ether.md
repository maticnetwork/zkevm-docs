---
id: deposit-ether
title: deposit ether
keywords:
- 'pos client, depositEther, polygon, sdk'
description: 'ฝาก Ether ในจำนวนที่ต้องการจาก Ethereum ไปยัง Polygon'
---

ใช้เมธอด `depositEther` เพื่อฝาก **Ether** ในจำนวนที่ต้องการจาก Ethereum ไปยัง Polygon ได้

```
const result = await posClient.depositEther(<amount>, <userAddress>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
