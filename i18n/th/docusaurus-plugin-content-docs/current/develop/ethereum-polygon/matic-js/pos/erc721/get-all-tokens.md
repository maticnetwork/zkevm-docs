---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'เรียกโทเค็นทั้งหมดที่เป็นของผู้ใช้ที่ระบุ'
---

เมธอด `getAllTokens` จะคืนค่าโทเค็นทั้งหมดที่เป็นของผู้ใช้ที่ระบุ

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

คุณยังสามารถจำกัดโทเค็นได้โดยระบุค่าขีดจำกัดในพารามิเตอร์ที่สอง
