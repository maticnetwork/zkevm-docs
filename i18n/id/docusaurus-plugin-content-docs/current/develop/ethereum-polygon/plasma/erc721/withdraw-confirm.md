---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawConfirm {#withdrawconfirm}

Metode `withdrawConfirm` adalah langkah kedua dalam proses penarikan plasma. Dalam langkah ini, bukti transaksi bakar (transaksi pertama) dikirimkan dan akan dibuat token erc721 dengan nilai yang setara.

Setelah proses ini berhasil, periode tantangan dimulai dan setelah periode tantangan selesai, pengguna dapat mengembalikan jumlah yang ditarik ke dalam akun mereka pada rantai root.

Periode tantangan berlangsung selama 7 hari untuk mainnet.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
