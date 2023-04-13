---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# isApproved {#isapproved}

เมธอด `isApproved` ตรวจสอบว่าโทเค็นได้รับอนุมัติหรือไม่สำหรับ tokenId ที่ระบุโดยจะส่งคืนค่าบูลีน

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
