---
id: validator-index
title: Indeks Validator
description: Sebuah koleksi instruksi tentang cara menjalankan dan mengoperasikan node validator di Jaringan Polygon
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Terus ikuti kabar terbaru

Terus dengan update node dan validator terbaru dari tim Polygon dan komunitas dengan berlangganan ke [pemberitahuan Polygon](https://polygon.technology/notifications/).

:::

Validator adalah aktor utama dalam memelihara jaringan Polygon. Validator menjalankan node penuh dan mengamankan
jaringan dengan staking MATIC untuk menghasilkan blok, memvalidasi, dan berpartisipasi dalam konsensus PoS.

:::info

Tidak ada banyak ruang untuk menerima validator baru. Validator baru hanya dapat bergabung dengan set aktif ketika validator yang saat ini aktif melepaskan ikatan.

Proses lelang baru untuk pengganti validator akan dilaksanakan.

:::

## Ikhtisar {#overview}

Polygon terdiri dari tiga lapisan berikut:

* Lapisan Ethereum — sebuah set kontrak di Ethereum mainnet.
* Lapisan Heimdall — sebuah set node Heimdall proof-of-stake yang berjalan paralel dengan Ethereum mainnet, memantau set kontrak staking yang disebar di Ethereum mainnet, dan melakukan titik periksa Jaringan Polygon ke Ethereum mainnet. Heimdall didasarkan pada Tendermint.
* Lapisan Bor — sebuah set node Bor penghasil blok yang diacak oleh node Heimdall. Bor didasarkan pada Go Ethereum.

Untuk menjadi validator di Jaringan Polygon, Anda harus menjalankan:

* Node sentry — mesin terpisah yang menjalankan node Heimdall dan Bor. Node sentry terbuka untuk semua node di Jaringan Polygon.
* Node validasi — mesin terpisah yang menjalankan node Heimdall dan Bor. Node validator hanya dibuka untuk node sentry dan ditutup untuk sisa jaringan.
* Stake token MATIC dalam kontrak staking yang digunakan di Ethereum mainnet.

## Komponen {#components}

### Heimdall {#heimdall}

Heimdall melakukan hal-hal berikut:

* Mengawasi kontrak staking di Ethereum mainnet.
* Memverifikasi semua transisi kondisi di rantai Bor.
* Menjalankan titik periksa kondisi rantai Bor ke Ethereum mainnet.

Heimdall didasarkan pada Tendermint.

:::info Lihat juga

* Repositori GitHub: [Heimdall](https://github.com/maticnetwork/heimdall)
* Repositori GitHub: [Kontrak staking](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Posting blog: [Heimdall dan Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor melakukan hal-hal berikut:

* Menghasilkan blok di Jaringan Polygon.

Bor adalah node dan lapisan produsen blok untuk Jaringan Polygon. Ini didasarkan pada Go Ethereum. Blok yang diproduksi di Bor divalidasi oleh node Heimdall.

:::info Lihat juga

* Repositori GitHub: [Bor](https://github.com/maticnetwork/bor)
* Posting blog: [Heimdall dan Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Bagian ini membahas topik-topik berikut:

* [Tanggung jawab validator](validator-responsibilities.md)
* Bergabung dengan jaringan sebagai validator:
  * [Memulai dan menjalankan node dengan Ansible](run-validator-ansible.md)
  * [Memulai dan menjalankan node dengan biner](run-validator-binaries.md)
  * [Men-stake sebagai validator](validator-staking-operations.md)
* Mempertahankan node validator Anda:
  * [Mengubah alamat penandatangan](change-signer-address.md)
  * [Mengubah komisi](validator-commission-operations.md)

Bantuan komunitas:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
