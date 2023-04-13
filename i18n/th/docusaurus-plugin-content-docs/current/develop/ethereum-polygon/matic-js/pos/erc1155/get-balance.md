---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'รับยอดคงเหลือของโทเค็น ERC1155 โดยใช้ matic.js'
---

ใช้เมธอด `getBalance` เพื่อรับยอดคงเหลือของผู้ใช้สำหรับโทเค็นได้ใช้ได้ทั้งโทเค็นย่อยและโทเค็นหลัก

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
