---
id: transfer
title: chuyển
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Chuyển token từ người dùng này sang người dùng khác.'
---

Có thể sử dụng phương pháp `transfer` để chuyển token từ người dùng này sang người dùng khác.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
