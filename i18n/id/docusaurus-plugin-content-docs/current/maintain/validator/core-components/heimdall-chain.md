---
id: heimdall-chain
title: Rantai Heimdall
description: Lapisan penguat proof-of-stake di Jaringan Polygon
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall adalah lapisan pengenal stake yang bertanggung jawab untuk [mengecek,](/docs/maintain/glossary.md#checkpoint-transaction) representasi blok Plasma ke mainnet Ethereum. Heimdall didasarkan pada [Tendermint](https://tendermint.com/).

Kontrak staking di Ethereum mainnet bekerja sama dengan node Heimdall untuk bertindak sebagai mekanisme manajemen stake tanpa kepercayaan untuk mesin PoS Polygon, termasuk memilih set [validator](/docs/maintain/glossary.md#validator), memperbarui validator, dll. Karena staking dilakukan dalam kontrak di Ethereum mainnet, Polygon tidak hanya mengandalkan kejujuran validator dan sebagai gantinya mewarisi keamanan Ethereum mainnet.

Lapisan Heimdall menangani agregasi blok yang dihasilkan oleh [Bor](/docs/maintain/glossary.md#bor) ke dalam pohon Merkle dan menerbitkan root Merkle secara berkala ke Ethereum mainnet. Penerbitan berkala ini disebut *titik periksa*.

Untuk setiap beberapa blok di Bor, validator (pada lapisan Heimdall):

1. Memvalidasi semua blok sejak titik periksa terakhir.
2. Membuat pohon Merkle dari hash blok.
3. Menerbitkan root Merkle ke Ethereum mainnet.

Titik periksa penting untuk dua alasan:

1. Menyediakan finalitas pada rantai root.
2. Menyediakan bukti dari membakar penarikan aset.

Gambaran umum prosesnya:

* Sebagian validator aktif dari pool dipilih untuk bertindak sebagai [produsen blok](/docs/maintain/glossary.md#block-producer) untuk [rentang](/docs/maintain/glossary.md#span). Produsen blok bertanggung jawab untuk membuat blok dan menyiarkan blok yang dibuat di jaringan.
* Titik periksa mencakup hash root Merkle dari semua blok yang dibuat selama interval tertentu. Semua node memvalidasi hash root Merkle dan melampirkan tanda tangan mereka ke itu.
* Sebuah [pengusul](/docs/maintain/glossary.md#proposer) terpilih dari set validator bertanggung jawab untuk mengumpulkan semua tanda tangan untuk titik periksa tertentu dan melakukan titik periksa di Ethereum mainnet.
* Tanggung jawab untuk membuat blok dan mengusulkan titik periksa bervariasi tergantung pada rasio stake validator di kumpulan keseluruhan.

Lihat juga [arsitektur Heimdall](/docs/pos/heimdall/overview).
