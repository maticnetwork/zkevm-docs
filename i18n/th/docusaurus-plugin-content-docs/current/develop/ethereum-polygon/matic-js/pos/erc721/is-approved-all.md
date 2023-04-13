---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'ตรวจสอบว่าโทเค็นทั้งหมดได้รับการอนุมัติหรือไม่'
---

เมธอด `isApprovedAll` ตรวจสอบว่าโทเค็นทั้งหมดได้รับการอนุมัติหรือไม่โดยจะส่งคืนค่าบูลีน

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
