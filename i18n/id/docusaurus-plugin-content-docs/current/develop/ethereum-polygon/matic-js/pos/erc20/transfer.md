---
id: transfer
title: transfer
keywords:
- 'POS client, erc20, transfer, polygon, sdk'
description: 'Mentransfer jumlah dari satu alamat ke alamat lain.'
---

Metode `transfer` dapat digunakan untuk mentransfer jumlah dari satu alamat ke alamat lain.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
