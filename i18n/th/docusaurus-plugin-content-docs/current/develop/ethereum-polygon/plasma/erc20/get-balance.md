---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# getBalance {#getbalance}

ใช้เมธอด `getBalance` เพื่อรับยอดคงเหลือของผู้ใช้ใช้ได้ทั้งโทเค็นย่อยและโทเค็นหลัก

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
