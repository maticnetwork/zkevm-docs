---
id: withdraw-confirm-faster
title: withdraw challenge faster
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

Metode  `withdrawConfirmFaster` adalah langkah kedua dalam proses penarikan plasma. Dalam langkah ini, bukti bakar transaksi (transaksi pertama) dikirimkan dan token erc721 dengan nilai yang setara akan dibuat.

Setelah proses ini berhasil, periode tantangan dimulai dan setelah periode tantangan selesai, pengguna dapat mengembalikan jumlah yang ditarik ke akun mereka pada rantai root.

Periode tantangan berlangsung selama 7 hari untuk mainnet.

<div class="highlight mb-20px mt-20px">
Proses ini cepat karena menghasilkan bukti di backend. Anda perlu mengonfigurasi [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

**Catatan** - transaksi withdrawStart harus diperiksa untuk menantang penarikan.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Setelah periode tantangan selesai, `withdrawExit` dapat dipanggil untuk keluar dari proses penarikan dan mengembalikan jumlah yang ditarik.
