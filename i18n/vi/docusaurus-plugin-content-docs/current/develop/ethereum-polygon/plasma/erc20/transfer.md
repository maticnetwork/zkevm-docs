---
id: transfer
title: chuyển
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Chuyển token plasma erc20'
---

# Chuyển {#transfer}

Có thể sử dụng phương pháp `transfer` để chuyển số tiền từ địa chỉ này sang địa chỉ khác.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Chuyển token MATICS {#transfer-matic-token}

MATIC là token gốc trên polygon. Vì vậy, chúng tôi hỗ trợ việc chuyển token matic mà không cần địa chỉ token.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
