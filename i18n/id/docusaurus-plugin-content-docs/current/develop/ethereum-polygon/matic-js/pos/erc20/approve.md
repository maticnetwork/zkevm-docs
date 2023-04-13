---
id: approve
title: approve
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Menyetujui jumlah token root yang diperlukan."
---

Metode `approve` dapat digunakan untuk menyetujui jumlah token root yang diperlukan.

approve diperlukan untuk menyetor jumlah di rantai polygon.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Alamat tempat persetujuan diberikan yang disebut `spenderAddress`. Ini adalah pengguna pihak ketiga atau kontrak cerdas yang dapat mentransfer token mewakili Anda.

Secara default, nilai spenderAddress adalah alamat predikat erc20.

Anda dapat menentukan nilai alamat spender secara manual.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
