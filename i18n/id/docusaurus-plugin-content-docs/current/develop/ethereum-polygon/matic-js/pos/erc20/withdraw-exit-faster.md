---
id: withdraw-exit-faster
title: withdraw exit faster
keywords:
- 'pos client, erc20, withdrawExitFaster, polygon, sdk'
description: 'Keluar dari proses penarikan lebih cepat menggunakan txHash dari withdrawStart.'
---

Metode `withdrawExitFaster` dapat digunakan untuk keluar dari proses penarikan lebih cepat dengan menggunakan txHash dari metode `withdrawStart`.

Umumnya, ini cepat karena menghasilkan bukti di backend. Anda perlu mengonfigurasi [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Catatan** - transaksi withdrawStart harus diperiksa untuk keluar dari proses penarikan.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20RootToken = posClient.erc20(<root token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Setelah transaksi & titik periksa selesai, jumlah akan disetorkan ke rantai root.
