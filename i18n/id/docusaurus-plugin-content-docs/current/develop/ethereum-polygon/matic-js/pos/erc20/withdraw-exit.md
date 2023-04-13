---
id: withdraw-exit
title: withdraw exit
keywords:
- 'pos client, erc20, withdrawExit, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari withdrawStart.'
---

Metode `withdrawExit` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStart`.

**Catatan** - transaksi withdrawStart harus diperiksa untuk keluar dari proses penarikan.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Metode ini melakukan banyak panggilan RPC untuk menghasilkan bukti proses melakukan proses keluar. Jadi, sebaiknya menggunakan metode withdrawExitFaster.
>

