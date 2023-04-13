---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Mendapatkan jumlah yang disetujui untuk pengguna."
---

Metode `getAllowance` dapat digunakan untuk mendapatkan jumlah yang disetujui untuk pengguna.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Alamat tempat persetujuan diberikan yang disebut `spenderAddress`. Ini adalah pengguna pihak ketiga atau kontrak cerdas yang dapat mentransfer token mewakili Anda.

Secara default, nilai spenderAddress adalah alamat predikat erc20.

Anda dapat menentukan nilai alamat spender secara manual.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
