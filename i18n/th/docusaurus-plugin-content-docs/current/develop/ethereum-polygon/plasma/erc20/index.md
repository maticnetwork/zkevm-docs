---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'เริ่มต้นทำงานกับ Maticjs'
---

# ERC20 {#erc20}

`plasmaClient`มี`erc20`วิธีการที่ช่วยให้คุณสามารถโต้ตอบกับโทเค็น 20 แบบ erc.

## โทเค็นย่อย {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## โทเค็นต้นทาง {#root-token}

เริ่มต้นโทเค็นต้นทางได้โดยระบุค่าพารามิเตอร์ที่สองเป็น `true`

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
