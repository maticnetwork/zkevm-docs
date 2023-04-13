---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: 'ตรวจสอบว่าออกจากการถอนหรือยัง'
---

เมธอด `isWithdrawExited`ตรวจสอบว่าออกจากการถอนหรือยังโดยจะส่งคืนค่าบูลีน

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
