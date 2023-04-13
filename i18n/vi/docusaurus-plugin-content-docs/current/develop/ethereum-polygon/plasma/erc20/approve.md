---
id: approve
title: phê duyệt
keywords:
- 'pos client, erc20, approve, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# phê duyệt {#approve}

Có thể sử dụng phương pháp `approve` để phê duyệt số lượng cần thiết cho token gốc.

bước phê duyệt là bắt buộc để nạp tiền trên chuỗi polygon.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
