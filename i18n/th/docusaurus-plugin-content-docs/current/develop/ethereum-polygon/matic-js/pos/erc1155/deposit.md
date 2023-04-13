---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'ฝากโทเค็น ERC1155 โดยใช้ matic.js'
---

ใช้เมธอด `deposit` เพื่อฝาก Ether ในจำนวนที่ต้องการจาก Ethereum ไปยัง Polygon ได้

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

ระบุ**ข้อมูล**หรือไม่ก็ได้