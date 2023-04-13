---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'ตรวจสอบว่าโทเค็นได้รับอนุมัติหรือไม่สำหรับ tokenId ที่ระบุ'
---

เมธอด `isApproved` ตรวจสอบว่าโทเค็นได้รับอนุมัติหรือไม่สำหรับ tokenId ที่ระบุโดยจะส่งคืนค่าบูลีน

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
