---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: ' เมธอด "ERC721" ที่ช่วยในการโต้ตอบกับโทเค็น ERC721'
---

# ERC721 {#erc721}

`POSClient` ให้เมธอด `erc721` ที่ช่วยในการโต้ตอบกับโทเค็น ERC721

เมธอดนี้จะคืนค่าอ็อบเจ็กต์ที่มีหลายเมธอด

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

ส่งผ่านอาร์กิวเมนต์ที่สองสำหรับ `isRoot` หรือไม่ก็ได้

## โทเค็นย่อย {#child-token}

เริ่มต้นโทเค็นบน Polygon ได้โดยใช้ไวยากรณ์นี้ -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## โทเค็นหลัก {#parent-token}

เริ่มต้นโทเค็นบน Ethereum ได้โดยระบุค่าพารามิเตอร์ที่สองเป็น `true`

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
