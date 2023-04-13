---
id: withdraw-exit-faster
title: withdrawExitFaster
keywords:
- 'plasma client, erc721, withdrawExitFaster, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawExitFaster {#withdrawexitfaster}

Metode `withdrawExitFaster` dapat digunakan untuk menyetujui semua token.

Metode ini cepat karena menghasilkan bukti di backend. Backend tersebut dapat dikonfigurasi dengan rpc privat khusus.

**Catatan** - transaksi withdrawStart harus diperiksa untuk keluar dari proses penarikan.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
