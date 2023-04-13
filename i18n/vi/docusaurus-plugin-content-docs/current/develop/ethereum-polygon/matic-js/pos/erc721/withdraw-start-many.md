---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Bắt đầu quy trình rút tiền.'
---

Có thể sử dụng phương pháp `withdrawStartMany`để bắt đầu quy trình rút tiền. Quy trình này sẽ đốt nhiều token trên chuỗi polygon.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
