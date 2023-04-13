---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# getTokensCount {#gettokenscount}

เมธอด `getTokensCount` จะคืนค่าจำนวนโทเค็นให้กับผู้ใช้ที่ระบุ

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
