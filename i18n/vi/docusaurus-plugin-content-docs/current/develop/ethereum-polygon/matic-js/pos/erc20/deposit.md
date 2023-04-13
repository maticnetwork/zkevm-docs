---
id: deposit
title: nạp
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Nạp số lượng yêu cầu từ token gốc sang token con.'
---

Có thể sử dụng phương pháp `deposit` để nạp số lượng cần thiết từ token gốc sang token con.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Có thể mất một khoảng thời gian để phản ánh số lượng đã nạp trên chuỗi polygon. Bạn có thể dùng phương pháp [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) để kiểm tra trạng thái.
