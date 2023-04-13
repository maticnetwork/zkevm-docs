---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "ให้เมธอดในการโต้ตอบกับโทเค็น ERC20"
---

# ERC20 {#erc20}

`POSClient`มี`erc20`วิธีการที่ช่วยให้คุณสามารถโต้ตอบกับ**โทเค็น ERC20**

เมธอดนี้จะคืนค่าอ็อบเจ็กต์ที่มีเมธอดอื่นๆ หลากหลาย

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

ส่งผ่านอาร์กิวเมนต์ที่สองสำหรับ `isRoot` หรือไม่ก็ได้

## โทเค็นย่อย {#child-token}

เริ่มต้นโทเค็นบน Polygon ได้โดยใช้ไวยากรณ์นี้ -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## โทเค็นหลัก {#parent-token}

เริ่มต้นโทเค็นบน Ethereum ได้โดยการระบุค่าของพารามิเตอร์ที่สองเป็น `true`

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
