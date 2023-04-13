---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# isApprovedAll {#isapprovedall}

เมธอด `isApprovedAll` ตรวจสอบว่าโทเค็นทั้งหมดได้รับการอนุมัติหรือไม่โดยจะส่งคืนค่าบูลีน

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
