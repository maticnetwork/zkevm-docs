---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Menyetujui jumlah maksimum di token root.'
---

Metode `approveMax` dapat digunakan untuk menyetujui jumlah token root maksimum.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

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
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
