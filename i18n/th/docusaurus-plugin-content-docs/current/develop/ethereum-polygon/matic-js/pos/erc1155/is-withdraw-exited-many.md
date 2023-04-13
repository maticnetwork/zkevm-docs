---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'ตรวจสอบว่าออกจากการถอนหรือยังสำหรับหลายโทเค็น'
---

เมธอด `isWithdrawExitedMany` ตรวจสอบว่าออกจากการถอนหรือยังสำหรับหลายโทเค็นโดยจะส่งคืนค่าบูลีน

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
