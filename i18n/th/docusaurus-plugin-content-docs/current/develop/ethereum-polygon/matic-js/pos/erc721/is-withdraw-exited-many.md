---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'ตรวจสอบว่าออกจากการถอนหรือยังสำหรับหลายโทเค็น'
---

เมธอด `isWithdrawExitedMany` ตรวจสอบว่าออกจากการถอนหรือยังสำหรับหลายโทเค็นโดยจะส่งคืนค่าบูลีน

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
