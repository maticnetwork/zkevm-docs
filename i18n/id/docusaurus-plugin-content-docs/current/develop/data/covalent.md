---
id: covalent
title: Menggunakan Covalent
sidebar_label: Covalent
description: Pelajari cara menggunakan API terpadu dari Covalent untuk data
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Pengantar {#introduction}

Polygon membawa skala yang besar ke Ethereum menggunakan versi Plasma yang diadaptasi
dengan rantai sisi berbasis PoS yang menyediakan solusi untuk transaksi
yang lebih cepat dan berbiaya sangat rendah dengan finalitas di rantai utama Jaringan Polygon memastikan
keaktifan menggunakan titik periksa PoS yang didorong ke rantai utama Ethereum.
Ini memungkinkan rantai sisi Polygon tunggal untuk secara teoretis mencapai transaksi `2^16`
per blok dan kemungkinan jutaan transaksi pada banyak rantai di masa depan.

### Fakta singkat {#quick-facts}

<TableWrap>

| Properti | Nilai |
|---|---|
| ChainID Polygon Mainnet | `137` |
| ChainID Polygon Mumbai Testnet | `80001` |
| Penjelajah Blockchain Polygon | https://polygonscan.com/ |
| Waktu blok | ~3 detik |
| Latensi penyegaran data | ~6 detik atau 2 Blok |

</TableWrap>

:::tip Mulai cepat

Lihat **[<ins>video pengantar ini</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
untuk memulai.

:::

## Titik akhir yang didukung {#supported-endpoints}

Semua titik akhir [__Kelas A__](https://www.covalenthq.com/docs/api/#tag--Class-A) didukung untuk Matic mainnet dan Mumbai testnet. Anda dapat melakukan kueri jaringan mana pun via API terpadu dengan mengubah `chainId`.

:::info Titik akhir

Daftar lengkap dari semua permintaan yang Anda dapat lakukan di jaringan Polygon dengan menggunakan Covalent
tersedia di [<ins>dokumentasi API Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Lampiran {#appendix}

### Token Gas Matic {#matic-gas-token}

Untuk berinteraksi dengan jaringan Matic, token MATIC diperlukan untuk membayar sebagai biaya gas. Respons
Covalent secara otomatis menampilkan kolom `gas_*` dalam unit MATIC.

### Pemetaan token {#token-mapping}

Covalent mempertahankan pemetaan waktu nyata di rantai dari alamat token antara Ethereum mainnet dan rantai Matic. Alamat ini digunakan untuk melakukan pencarian balik harga pada Matic dan memberikan URL logo token yang benar.

Beberapa contoh token yang dipetakan:

| Token | Ethereum mainnet | Matic mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Harga token {#token-prices}

Untuk token yang memiliki pemetaan kembali ke Ethereum mainnet, Covalent mampu memberikan harga yang dipetakan.
