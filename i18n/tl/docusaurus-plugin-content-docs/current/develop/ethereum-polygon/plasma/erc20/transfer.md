---
id: transfer
title: paglipat
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Maglipat ng mga erc20 plasma token'
---

# Paglipat {#transfer}

Puwedeng gamitin ang paraang `transfer` upang maglipat ng halaga mula sa isang address papunta sa isa pang address.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Paglipat MATIC token {#transfer-matic-token}

Isang likas na token sa polygon ang MATIC. Kaya sinusuportahan namin ang paglipat ng mga matic token nang walang anumang token address.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
