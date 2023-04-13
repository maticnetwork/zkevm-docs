---
id: transfer
title: transfer
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'โอนโทเค็น ERC20 Plasma'
---

# โอน {#transfer}

ใช้เมธอด `transfer` เพื่อโอนยอดจากที่อยู่หนึ่งไปยังอีกที่อยู่หนึ่ง

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## โอนโทเค็น MATIC {#transfer-matic-token}

MATIC เป็นโทเค็นดั้งเดิมบน Polygonดังนั้น เราจึงรองรับการโอนโทเค็น Matic ที่ไม่มีที่อยู่โทเค็น

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
