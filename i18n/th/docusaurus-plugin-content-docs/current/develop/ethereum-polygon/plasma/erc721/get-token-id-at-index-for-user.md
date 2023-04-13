---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

เมธอด `getTokenIdAtIndexForUser` จะคืนค่า ID โทเค็นบนดัชนีที่ให้มาสำหรับผู้ใช้

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
