---
id: deposit
title: deposit
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# deposit {#deposit}

ใช้เมธอด `deposit` เพื่อฝากจำนวนที่ต้องการจากโทเค็นต้นทางไปยังโทเค็นย่อย

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
