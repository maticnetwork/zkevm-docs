---
id: withdraw-exit
title: withdrawExit
keywords:
- 'pos client, erc721, withdrawExit, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari `withdrawStart`'
---

Metode `withdrawExit` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStart`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```


Metode ini melakukan banyak panggilan RPC untuk menghasilkan bukti proses melakukan proses keluar. Jadi, sebaiknya menggunakan metode withdrawExitFaster.
>
