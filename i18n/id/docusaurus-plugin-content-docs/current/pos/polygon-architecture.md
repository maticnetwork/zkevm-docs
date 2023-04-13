---
id: polygon-architecture
title: Arsitektur Polygon
description: Arsitektur Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arsitektur Polygon {#the-architecture-of-polygon}

**Polygon** adalah platform aplikasi blockchain yang menyediakan blockchain hibrida dan Plasma.

Secara arsitektur, keindahan Polygon adalah desainnya yang elegan, yang menampilkan lapisan validasi lazim yang dipisahkan dari berbagai lingkungan eksekusi seperti rantai dengan pengaktifan Plasma, rantai sisi dengan dukungan penuh EVM, dan di masa depan, pendekatan Lapisan 2 lainnya seperti Optimistic Rollup.

Jaringan Polygon PoS memiliki arsitektur tiga lapis:

* **Lapisan** Ethereum — satu set kontrak pada mainnet Ethereum.
* **Heimdall layer** - set dari node Heimdall yang berjalan paralel ke Ethereum, memonitor set kontrak yang dikerahkan di mainnet Ethereum dan melakukan titik pemeriksaan Polygon Network ke mainnet Ethereum. Heimdall berbasis pada Tendermint.
* **Lapisan** Bor — satu set node Bor yang menghasilkan blok yang shuffled oleh node Heimdall. Bor berbasis pada Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Saat ini, pengembang dapat menggunakan **Plasma** untuk transisi kondisi tertentu yang untuknya predicate Plasma telah
dituliskan, seperti ERC20, ERC721, pertukaran aset, atau predicate kustom lainnya. Untuk transisi kondisi arbitrer,
mereka dapat menggunakan PoS. Atau keduanya! Hal ini dimungkinkan dengan adanya konstruksi hibrida Polygon.

Untuk mengaktifkan mekanisme PoS di platform kami, serangkaian kontrak pengelolaan **staking** ditempatkan di
Ethereum, dan sekumpulan validator yang diberikan insentif menjalankan node **Heimdall** dan **Bor**. Ethereum adalah
rantai dasar pertama yang didukung Polygon, tetapi Polygon bermaksud menawarkan dukungan untuk rantai dasar tambahan guna
mengaktifkan platform blockchain Lapisan 2 terdesentralisasi yang dapat dioperasikan yang berbasis pada saran dan konsensus komunitas.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Kontrak Staking {#staking-contracts}

Untuk memungkinkan mekanisme [Proof of Stake (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) di Polygon,
sistem menerapkan serangkaian kontrak pengelolaan [staking](/docs/maintain/glossary#staking) di Ethereum mainnet.

Kontrak staking mengimplementasikan fitur-fitur berikut:

* Siapa pun dapat melakukan staking pada token MATIC pada kontrak staking di Ethereum mainnet dan bergabung dengan sistem sebagai [validator](/docs/maintain/glossary#validator).
* Dapatkan imbalan staking untuk validasi transisi kondisi di Jaringan Polygon.
* Simpan [titik periksa](/docs/maintain/glossary#checkpoint-transaction) di Ethereum mainnet.

Mekanisme PoS Polygon juga bertindak sebagai mitigasi atas ketidaktersediaan data untuk rantai sisi Polygon.

## Heimdall {#heimdall}

Heimdall adalah lapisan validasi proof of stake yang menangani agregasi blok yang dihasilkan oleh [Bor](/docs/maintain/glossary#bor) ke dalam pohon Merkle dan menerbitkan root Merkle secara berkala ke
rantai root. Penerbitan snapshot secara berkala dari rantai sisi Bor disebut [titik periksa](/docs/maintain/glossary#checkpoint-transaction).

1. Memvalidasi semua blok setelah titik periksa terakhir.
2. Membuat pohon Merkle dari hash blok.
3. Menerbitkan hash root Merkle ke Ethereum mainnet.

Titik periksa penting untuk dua alasan:

1. Menyediakan finalitas pada rantai root.
2. Menyediakan bukti dari membakar penarikan aset.

Gambaran umum prosesnya:

* Bagian dari validator aktif dari kumpulan dipilih untuk bertindak sebagai [produsen blok](/docs/maintain/glossary#block-producer) untuk [rentang](/docs/maintain/glossary#span). Produsen blok ini bertanggung jawab untuk membuat blok dan menyiarkan blok yang dibuat di jaringan.
* Titik periksa mencakup hash root Merkle dari semua blok yang dibuat selama interval yang diberikan. Semua node memvalidasi hash root Merkle dan melampirkan tanda tangan mereka ke itu.
* Sebuah [pengusul](/docs/maintain/glossary#proposer) terpilih dari set validator bertanggung jawab untuk mengumpulkan semua tanda tangan untuk titik periksa tertentu dan melakukan titik periksa di Ethereum mainnet.
* Tanggung jawab untuk membuat blok dan mengusulkan titik periksa bervariasi tergantung pada rasio stake validator di keseluruhan kelompok.

Detail lebih lanjut tentang Heimdall tersedia di panduan [arsitektur Heimdall](/docs/pos/heimdall/overview).

## Bor {#bor}

Bor adalah produser blok sisi Polygon, - entitas yang bertanggung jawab untuk agregasi transaksi menjadi blok. Saat ini, ini adalah implementasi Geth dasar dengan perubahan kustom yang dilakukan pada algoritme konsensusnya.

Produser blok adalah subnet dari validator dan secara periodik dipotong-potong melalui pemilihan komite pada [Heimdall](/docs/maintain/glossary#heimdall) dalam durasi-nya sebagai `span` di Polygon. Blok diproduksi di node **Bor**, dan VM rantai sisinya kompatibel dengan EVM.
Blok yang diproduksi di Bor juga divalidasi secara berkala oleh node Heimdall, dan titik periksa yang terdiri dari:
hash pohon Merkle dari serangkaian blok di Bor dimasukkan ke Ethereum secara berkala.

Detail lebih jauh tersedia di panduan [arsitektur Bor](/docs/pos/bor/overview).

## Sumber daya {#resources}

* [Arsitektur Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Arsitektur Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Mekanisme Titik Periksa](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
