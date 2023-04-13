---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'เรียก ID โทเค็นบนดัชนีที่ให้มาสำหรับผู้ใช้'
---

เมธอด `getTokenIdAtIndexForUser` จะคืนค่า ID โทเค็นบนดัชนีที่ให้มาสำหรับผู้ใช้

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
