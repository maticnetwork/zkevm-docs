---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc1155, withdrawStartMany, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền.'
---

Có thể sử dụng phương pháp `withdrawStartMany` để bắt đầu quy trình rút tiền, quy trình này sẽ đốt số lượng cụ thể của nhiều token tương ứng trên chuỗi polygon.

```
const erc1155Token = posClient.erc1155(<child token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
