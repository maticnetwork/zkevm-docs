---
id: transfer
title: chuyển
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Chuyển số tiền từ địa chỉ này sang địa chỉ khác.'
---

Có thể sử dụng phương pháp `transfer` để chuyển số tiền từ địa chỉ này sang địa chỉ khác.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
