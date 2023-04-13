---
id: transfer
title: transfer
keywords:
- 'plasma client, erc20, transfer, polygon, sdk'
description: 'Mentransfer token plasma erc20.'
---

Metode `transfer` dapat digunakan untuk melakukan transfer jumlah dari alamat satu ke alamat lain.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Transfer token MATIC {#transfer-matic-token}

MATIC adalah token asli di Polygon. Kami mendukung transfer token tanpa alamat token apa pun.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
