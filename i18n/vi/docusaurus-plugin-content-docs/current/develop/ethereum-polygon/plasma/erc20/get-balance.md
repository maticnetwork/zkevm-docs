---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# getBalance {#getbalance}

Có thể sử dụng phương pháp `getBalance` để lấy số dư của người dùng. Phương pháp này khả dụng trên cả token mẹ và con.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
