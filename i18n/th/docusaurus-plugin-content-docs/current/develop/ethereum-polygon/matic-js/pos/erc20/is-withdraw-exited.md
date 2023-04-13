---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'ตรวจสอบว่าออกจากการถอนแล้วหรือไม่'
---

ใช้เมธอด `isWithdrawExited` เพื่อให้ตรวจสอบว่าออกจากการถอนแล้วหรือไม่

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
