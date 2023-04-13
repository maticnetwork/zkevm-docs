---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

Metode `withdrawConfirmFaster` adalah langkah kedua dalam proses penarikan plasma. Dalam langkah ini, bukti transaksi bakar (transaksi pertama) dikirimkan dan akan dibuat token erc721 dengan nilai yang setara.

Setelah proses ini berhasil, periode tantangan dimulai dan setelah periode tantangan selesai, pengguna dapat mengembalikan jumlah yang ditarik ke dalam akun mereka pada rantai root.

Periode tantangan berlangsung selama 7 hari untuk mainnet.

<div class="highlight mb-20px mt-20px">
Periode ini cepat karena menghasilkan bukti di backend. Anda perlu mengkonfigurasi [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
