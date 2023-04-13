---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'ตรวจสอบว่าออกจากการถอนหรือยัง'
---

เมธอด `isWithdrawExited` ตรวจสอบว่าออกจากการถอนหรือยังโดยจะส่งคืนค่าบูลีน

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
