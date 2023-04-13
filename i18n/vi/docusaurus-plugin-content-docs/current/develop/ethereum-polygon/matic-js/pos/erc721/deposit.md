---
id: deposit
title: nạp
keywords:
- 'pos client, erc721, deposit, polygon, sdk'
description: 'Nạp một token từ ethereum sang chuỗi polygon.'
---

Có thể sử dụng phương pháp `deposit` để nạp một token từ ethereum sang chuỗi polygon.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
