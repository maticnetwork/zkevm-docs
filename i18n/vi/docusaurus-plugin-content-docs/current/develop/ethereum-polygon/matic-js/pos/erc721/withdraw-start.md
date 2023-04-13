---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc721, withdrawStart, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền.'
---

Có thể sử dụng phương pháp `withdrawStart` để bắt đầu quy trình rút tiền. Quy trình này sẽ đốt token đã định trên chuỗi polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
