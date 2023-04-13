---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# getAllTokens {#getalltokens}

เมธอด `getAllTokens` จะคืนค่าโทเค็นทั้งหมดที่ผู้ใช้ที่ระบุเป็นเจ้าของ

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

คุณยังสามารถจำกัดโทเค็นได้โดยระบุค่าขีดจำกัดในพารามิเตอร์ที่สอง
