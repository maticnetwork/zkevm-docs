---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'โต้ตอบกับโทเค็น ERC1155 โดยใช้ matic.js'
---

# ERC1155 {#erc1155}

`POSClient`มี`erc1155`วิธีการที่ช่วยให้คุณสามารถโต้ตอบกับโทเค็น แบบ Merc155

เมธอดนี้จะคืนค่าอินสแตนซ์ในคลาส **ERC1155** ซึ่งประกอบด้วยหลายเมธอด

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

ส่งผ่านอาร์กิวเมนต์ที่สองสำหรับ `isRoot` หรือไม่ก็ได้

## โทเค็นย่อย {#child-token}

เริ่มต้นโทเค็นบน Polygon ได้โดยใช้ไวยากรณ์นี้ -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## โทเค็นหลัก {#parent-token}

เริ่มต้นโทเค็นบน Ethereum ได้โดยระบุค่าพารามิเตอร์ที่สองเป็น `true`

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
