---
id: withdraw-exit-faster-many
title: withdrawExitFasterMany
keywords:
- 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
description: 'Keluar dari proses penarikan menggunakan txHash dari `withdrawStartMany`.'
---

Metode `withdrawExitFasterMany` dapat digunakan untuk keluar dari proses penarikan dengan menggunakan txHash dari metode `withdrawStartMany`.


Metode ini cepat karena menghasilkan bukti di backend. Anda perlu mengonfigurasi [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Catatan** - transaksi withdrawStart harus diperiksa untuk keluar dari proses penarikan.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
