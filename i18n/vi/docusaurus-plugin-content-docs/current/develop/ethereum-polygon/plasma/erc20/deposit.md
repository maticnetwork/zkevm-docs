---
id: deposit
title: nạp
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# nạp {#deposit}

Có thể sử dụng phương pháp `deposit` để nạp số tiền cần thiết từ token gốc sang token con.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
