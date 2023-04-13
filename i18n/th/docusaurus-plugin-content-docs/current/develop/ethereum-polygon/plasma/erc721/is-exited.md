---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# isExited {#isexited}

เมธอด `isExited` ตรวจสอบว่าออกจากการถอนหรือยังโดยจะส่งคืนค่าบูลีน

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
