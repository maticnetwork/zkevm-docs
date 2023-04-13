---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# โอน {#transfer}

เมธอด `transfer` โอนโทเค็นจากผู้ใช้รายหนึ่งไปยังผู้ใช้อีกรายหนึ่ง

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
