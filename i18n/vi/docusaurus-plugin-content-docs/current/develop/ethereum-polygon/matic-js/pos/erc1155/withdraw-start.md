---
id: withdraw-start
title: withdrawStart
keywords:
- 'pos client, erc1155, withdrawStart, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền.'
---

Có thể sử dụng phương pháp `withdrawStart` để bắt đầu quy trình rút tiền, quy trình này sẽ đốt số lượng tokenId đã định trên chuỗi polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStart(<token id>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
