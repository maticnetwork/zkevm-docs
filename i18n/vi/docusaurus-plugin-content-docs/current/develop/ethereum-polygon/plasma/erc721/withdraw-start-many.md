---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'plasma client, erc721, withdrawStartMany, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# withdrawStartMany {#withdrawstartmany}

Có thể sử dụng phương pháp `withdrawStartMany`để bắt đầu quy trình rút tiền. Quy trình này sẽ đốt nhiều token trên chuỗi polygon.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
