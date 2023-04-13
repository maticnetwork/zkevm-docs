---
id: glossary
title: Glosarium
description: ists Polygon Kunci
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Produsen blok {#block-producer}

Produsen blok adalah [validator](#validator) aktif yang dipilih untuk bertindak sebagai produsen blok untuk [rentang](#span) tertentu.

Produsen blok bertanggung jawab untuk membuat blok dan menyiarkan blok yang dibuat di jaringan.

## Bor {#bor}

Node bor adalah node yang memproduksi node di Jaringan Polygon.

Bor didasarkan pada [Go Ethereum](https://geth.ethereum.org/).

## Transaksi titik periksa {#checkpoint-transaction}

Transaksi titik periksa adalah transaksi yang mengandung root Merkle dari blok-blok lapisan [Bor](#bor) di antara interval titik periksa.

Transaksi ini ditujukan untuk kontrak staking Polygon di Ethereum mainnet oleh node [Heimdall](#heimdall).

Lihat juga:

* [Arsitektur Heimdall: Titik periksa](/docs/pos/heimdall/checkpoint)
* [Mekanisme Titik Periksa](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Komisi {#commission}

Komisi adalah persentase imbalan yang diambil oleh [validator](#validator) dari [delegator](#delegator) yang melakukan stake dengan validator.

Lihat juga [Operasi Komisi Validator](/docs/maintain/validate/validator-commission-operations).

## Delegator {#delegator}

Peran delegator melakukan stake pada token MATIC untuk mengamankan Jaringan Polygon dengan [validator](#validator) yang sudah ada tanpa menjalankan node itu sendiri.

Lihat juga [Siapa Itu Delegator](/docs/maintain/polygon-basics/who-is-delegator).

## Node penuh {#full-node}

Node penuh adalah [node sentry](#sentry) yang disinkronkan sepenuhnya yang menjalankan [Heimdall](#heimdall) dan [Bor](#bor).

Lihat juga [Penyebaran Node Penuh](/docs/develop/network-details/full-node-deployment).

## Heimdall {#heimdall}

Node Heimdall adalah node yang berjalan secara paralel dengan Ethereum mainnet, memantau serangkaian kontrak yang diterapkan di Ethereum mainnet, dan menjalankan [titik periksa](#checkpoint-transaction) Jaringan Polygon untuk Ethereum mainnet.

Heimdall didasarkan pada [Tendermint](https://tendermint.com/).

## Alamat pemilik {#owner-address}

Alamat pemilik adalah alamat yang digunakan untuk stake, restake, mengubah alamat penandatangan, menarik imbalan, dan mengelola parameter terkait delegasi di Ethereum mainnet.

Sementara [Kunci penandatangan](#signer-address) disimpan di node dan dianggap sebagai dompet **panas**, kunci pemilik harus disimpan dengan sangat aman, tidak boleh sering digunakan, dan dianggap sebagai dompet **dingin**.

Lihat juga [Manajemen Kunci](validator/core-components/key-management.md).

## Pengusul {#proposer}

Pengusul adalah [validator](#validator) yang dipilih oleh algoritme untuk mengusulkan blok baru.

Pengusul juga bertanggung jawab untuk mengumpulkan semua tanda tangan untuk [titik periksa](#checkpoint-transaction) tertentu dan menjalankan titik periksa untuk Ethereum mainnet.

## Sentry {#sentry}

Node sentry adalah node yang menjalankan node [Heimdall](#heimdall) dan node [Bor](#bor) untuk mengunduh data dari node lain di jaringan dan menyebarkan data [validator](#validator) di jaringan tersebut.

Node sentry terbuka untuk semua node sentry lainnya di jaringan.

## Rentang {#span}

Sekelompok blok yang didefinisikan secara logis di mana sekumpulan validator dipilih dari semua [validator](#validator) yang tersedia.

Pemilihan setiap rentang diputuskan oleh setidaknya 2/3 validator dalam hal kekuatan staking.

Lihat juga [Konsesnsus Bor: Rentang](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Staking adalah proses mengunci token ke setoran untuk mendapatkan hak validasi dan menghasilkan blok di blockchain. Biasanya staking dilakukan di tanda asli untuk jaringan - untuk tanda MATIK terkunci oleh validator/staker di Jaringan Polygon. Contoh lainnya termasuk ETH in Ethereum (post-merge), ATOM di Cosmos, dll.

Lihat juga [Apa Itu Proof of Stake](polygon-basics/what-is-proof-of-stake.md).

## Alamat penandatangan {#signer-address}

Alamat penandatangan adalah alamat akun Ethereum dari node validator [Heimdall](#heimdall). Alamat penandatangan menandatangani dan mengirim [transaksi titik periksa](#checkpoint-transaction).

Sementara Kunci penandatangan disimpan di node dan dianggap sebag**ai dom**p[et panas, kunc](#owner-address)i pemilik harus disimpan dengan sangat aman, tidak boleh sering digunakan, dan dianggap sebag**ai dom**pet dingin.

Lihat juga [Manajemen Kunci](validator/core-components/key-management.md).

## Validator {#validator}

Validator [memata-matai token MATIC melalui](/docs/maintain/validate/validator-staking-operations) kontrak staking yang dikerahkan di mainnet Ethereum dan menjalankan node [Heimdall](#heimdall) dan node [Bor](#bor) untuk melakukan titik pemeriksaan jaringan ke mainnet Ethereum dan untuk menghasilkan blok di jaringan.

Node validator hanya dibuka untuk node [sentry](#sentry) dan ditutup untuk sisa jaringan.

Lihat juga [Siapa Itu Validator](polygon-basics/who-is-validator.md).
