---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'ฝากจำนวนที่ต้องการจากโทเค็นต้นทางไปยังโทเค็นย่อย'
---

ใช้เมธอด `deposit` เพื่อฝากจำนวนที่ต้องการจากโทเค็นต้นทางไปยังโทเค็นย่อย

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

อาจใช้เวลาบ้างในการแสดงจำนวนที่ฝากบนเชน Polygonคุณใช้เมธอด [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) ในการตรวจสอบสถานะ
