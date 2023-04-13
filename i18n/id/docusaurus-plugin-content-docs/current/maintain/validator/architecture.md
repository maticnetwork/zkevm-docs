---
id: architecture
title: Arsitektur
description: Ethereum, Heimdall dan Bor Bor.
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Jaringan Polygon secara luas dibagi menjadi tiga lapisan:

* **Lapisan** Ethereum — satu set kontrak pada mainnet Ethereum.
* **Heimdall layer** - set node Heimdall stake berjalan secara paralel ke Ethereum, memantau set kontrak yang dikerahkan di mainnet Ethereum, dan melakukan poin checkpoint Polygon ke mainnet Ethereum. Heimdall didasarkan pada Tendermint.
* **Lapisan** Bor — satu set node Bor yang menghasilkan blok yang shuffled oleh node Heimdall. Bor didasarkan pada Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Kontrak cerdas Staking dan Plasma di Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Untuk mengaktifkan mekanisme [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) di Polygon, sistem menggunakan satu set kontrak manajemen [staking](/docs/maintain/glossary.md#staking) di Ethereum mainnet.

Kontrak staking menerapkan fitur berikut:

* Kemampuan bagi siapa pun untuk men-stake token MATIK pada kontrak staking di Ethereum mainnet dan bergabung dengan sistem sebagai [validator](/docs/maintain/glossary.md#validator).
* Dapatkan imbalan staking untuk validasi transisi kondisi di Jaringan Polygon.
* Simpan [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction) di Ethereum mainnet.

Mekanisme PoS Polygon juga bertindak sebagai mitigasi untuk masalah data yang tidak tersedianya pada rantai sisi Polygon.

## Heimdall (lapisan validasi) {#heimdall-validation-layer}

Lapisan Heimdall menangani agregasi blok yang dihasilkan oleh [Bor](/docs/maintain/glossary.md#bor) ke dalam pohon Merkle dan menerbitkan root Merkle secara berkala ke rantai root. Penerbitan snapshot secara berkala dari rantai sisi Bor disebut [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction).

Untuk setiap beberapa blok di Bor, validator pada lapisan Heimdall:

1. Memvalidasi semua blok sejak titik periksa terakhir.
2. Membuat pohon Merkle dari hash blok.
3. Menerbitkan hash root Merkle ke Ethereum mainnet.

Titik periksa penting untuk dua alasan:

1. Menyediakan finalitas pada rantai root.
2. Menyediakan bukti dari membakar penarikan aset.

Gambaran umum prosesnya:

* Bagian dari validator aktif dari kumpulan dipilih untuk bertindak sebagai [produsen blok](/docs/maintain/glossary.md#block-producer) untuk [rentang](/docs/maintain/glossary.md#span). Produsen blok ini bertanggung jawab untuk membuat blok dan menyiarkan blok yang dibuat di jaringan.
* Titik periksa mencakup hash root Merkle dari semua blok yang dibuat selama interval yang diberikan. Semua node memvalidasi hash root Merkle dan melampirkan tanda tangan mereka ke itu.
* Sebuah [pengusul](/docs/maintain/glossary.md#proposer) terpilih dari set validator bertanggung jawab untuk mengumpulkan semua tanda tangan untuk titik periksa tertentu dan melakukan titik periksa di Ethereum mainnet.
* Tanggung jawab untuk membuat blok dan mengusulkan titik periksa bervariasi tergantung pada rasio stake validator di kumpulan keseluruhan.

Lihat juga [arsitektur Heimdall](/docs/pos/heimdall/overview).

## Bor (lapisan produsen blok) {#bor-block-producer-layer}

Bor adalah produsen blok rantai sisi Polygon — entitas yang bertanggung jawab untuk mengagregasi transaksi ke dalam blok.

Produsen blok Bor adalah bagian dari validator dan diacak secara berkala oleh validator [Heimdall](/docs/maintain/glossary.md#heimdall).

Lihat juga [arsitektur Bor](/docs/pos/bor/overview).
