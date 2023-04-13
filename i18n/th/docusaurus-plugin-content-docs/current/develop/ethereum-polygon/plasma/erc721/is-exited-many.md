---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# isExitedMany {#isexitedmany}

เมธอด `isExitedMany` ตรวจสอบว่าออกจากการถอนหรือยังโดยจะส่งคืนค่าบูลีน

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
