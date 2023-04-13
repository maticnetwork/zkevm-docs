---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'รับจำนวนโทเค็นสำหรับผู้ใช้ที่ระบุ'
---

เมธอด `getTokensCount` จะคืนค่าจำนวนโทเค็นให้กับผู้ใช้ที่ระบุ

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
