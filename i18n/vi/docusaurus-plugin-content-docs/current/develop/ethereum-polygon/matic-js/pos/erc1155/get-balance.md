---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Lấy số dư của token ERC1155 bằng matic.js.'
---

Có thể sử dụng phương pháp `getBalance` để lấy số dư token của người dùng. Phương pháp này khả dụng trên cả token mẹ và con.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
