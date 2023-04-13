---
id: accounts
title: Apa itu Akun?
sidebar_label: Accounts
description: "Akun EOA dan Kontrak."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Apa itu Akun? {#what-are-accounts}

State global Ethereum terdiri dari akun yang saling berinteraksi melalui kerangka kerja penerusan pesan. Interaksi yang paling mendasar adalah mengirim beberapa nilai - seperti token MATIC, tanda asli Polygon, atau $ETH, tanda asli dari blockchain Ethereum.

Setiap akun diidentifikasi oleh pengenal hex 20 byte yang disebut alamat - yang dihasilkan dari kunci publik dari akun.

Ada dua jenis akun: **Akun Berhak dan** **Akun Berhak** (Luar Biasa)

## Akun yang Dimiliki Secara Eksternal {#externally-owned-accounts}

EOA adalah akun yang dikendalikan oleh kunci pribadi, dengan kemampuan mengirim token dan pesan.

1. Mereka dapat mengirim transaksi (transfer eter atau kode kontrak pelatihan),
2. dikendalikan oleh kunci pribadi,
3. dan tidak memiliki kode yang terkait.

## Akun yang Dimiliki Kontrak {#contract-owned-accounts}
Kontrak Owned Account adalah akun yang memiliki kode kontrak cerdas yang terkait dengan itu dan kunci pribadi tidak dimiliki oleh siapa pun.

1. Mereka memiliki kode yang terkait.
2. eksekusi kode mereka dipicu oleh transaksi atau pesan (panggilan) yang diterima dari kontrak lain,
3. dan ketika kode ini dieksekusi - melakukan operasi kompleksitas yang sewenang-wenang (kelengkapan) - memanipulasi penyimpanan yang persisten dan dapat memanggil kontrak lain.

### Sumber daya {#resources}

- [Baca selengkapnya tentang akun](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
