---
id: deposit
title: deposit
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Menyetor jumlah yang diperlukan dari token root ke token anak.'
---

Metode `deposit` dapat digunakan untuk menyetor jumlah yang diperlukan dari token root ke token anak.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Mungkin perlu beberapa waktu untuk mencerminkan jumlah yang disetorkan di rantai polygon. Anda dapat menggunakan metode [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) untuk memeriksa status.
