---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# getAllowance {#getallowance}

ใช้เมธอด `getAllowance` เพื่อรับจำนวนที่อนุมัติสำหรับผู้ใช้

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
