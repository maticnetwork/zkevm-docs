---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'pos client, erc1155, withdrawExitFaster, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari withdrawStart.'
---

Metode `withdrawExitFaster` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStart`.

Metode ini cepat karena menghasilkan bukti di backend. Anda perlu mengonfigurasi [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Catatan** - transaksi withdrawStart harus diperiksa untuk keluar dari proses penarikan.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
