---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# ERC721 {#erc721}

`plasmaClient` ให้เมธอด `erc721` ที่ช่วยในการโต้ตอบกับโทเค็น ERC721

เมธอดนี้จะคืนค่าอ็อบเจ็กต์ที่มีหลายเมธอด

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## โทเค็นย่อย {#child-token}

เริ่มต้นโทเค็นบน Polygon ได้โดยใช้ไวยากรณ์นี้ -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## โทเค็นหลัก {#parent-token}

เริ่มต้นโทเค็นบน Ethereum ได้โดยระบุค่าพารามิเตอร์ที่สองเป็น `true`

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
