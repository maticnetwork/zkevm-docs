---
id: deposit
title: deposit
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: ' Menyetor jumlah yang diperlukan dari token root ke token anak.'
---

Metode `deposit` dapat digunakan untuk menyetorkan jumlah yang diperlukan dari token root ke token anak.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
