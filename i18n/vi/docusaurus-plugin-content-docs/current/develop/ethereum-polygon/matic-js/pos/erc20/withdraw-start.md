---
id: withdraw-start
title: bắt đầu rút tiền
keywords:
- 'pos client, erc20, withdrawStart, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền.'
---

Có thể sử dụng phương pháp `withdrawStart` để bắt đầu quy trình rút tiền, quy trình này sẽ đốt số lượng đã định trên chuỗi polygon.

```
const erc20Token = posClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Hàm băm giao dịch nhận được sẽ được sử dụng để thoát khỏi quá trình rút tiền. Vì vậy chúng tôi khuyên nên lưu trữ nó.

