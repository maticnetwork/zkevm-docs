---
id: withdraw-start
title: bắt đầu rút tiền
keywords:
- 'plasma client, erc20, approveMax, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawStart {#withdrawstart}

Có thể sử dụng phương pháp `withdrawStart` để bắt đầu quy trình rút tiền. Quy trình này sẽ đốt số tiền đã định trên token con.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

lưu trữ txHash sẽ được sử dụng để thử thách quy trình rút tiền.
