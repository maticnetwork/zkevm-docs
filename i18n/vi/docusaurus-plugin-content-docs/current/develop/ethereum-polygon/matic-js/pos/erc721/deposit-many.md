---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc721, depositMany, polygon, sdk'
description: 'Nạp nhiều token từ ethereum sang chuỗi polygon.'
---

Có thể sử dụng phương pháp `depositMany` để nạp nhiều token từ ethereum sang chuỗi polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.depositMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
