---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'ตรวจสอบว่าโทเค็นทั้งหมดได้รับการอนุมัติหรือไม่'
---

`isApprovedAll`เช็ควิธีว่าโทเค็นทั้งหมดได้รับการรับรองสำหรับผู้ใช้หรือไม่โดยจะส่งคืนค่าบูลีน

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
