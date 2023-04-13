---
id: withdraw-exit
title: withdraw exit
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# withdrawExit  {#withdrawexit}

Dalam plasma, proses penarikan bisa dibatalkan oleh siapa pun menggunakan metode `withdrawExit`. Proses keluar hanya akan bekerja setelah periode tantangan selesai.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Anda juga dapat melakukan proses keluar untuk beberapa token dengan menyediakan daftar token dalam bentuk array.
