---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'ฝากหลายโทเค็น ERC1155 โดยใช้ matic.js'
---

ใช้เมธอด `depositMany` เพื่อฝากหลายโทเค็นในจำนวนที่ต้องการจาก Ethereum ไปยังเชน Polygon

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

ระบุ**ข้อมูล**หรือไม่ก็ได้