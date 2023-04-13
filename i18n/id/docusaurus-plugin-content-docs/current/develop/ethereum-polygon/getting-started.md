---
id: getting-started
title: Jembatan Ethereum↔Polygon
sidebar_label: Overview
description: Saluran transaksi dua arah antara Polygon dan Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon menghadirkan saluran transaksi dua arah nirkepercayaan antara Polygon dan Ethereum dengan memperkenalkan jembatan lintas rantai menggunakan Plasma dan keamanan PoS. Dengan ini, pengguna dapat mentransfer token di seluruh Polygon tanpa menimbulkan risiko pihak ketiga dan batasan likuiditas pasar. **Jembatan Plasma dan PoS tersedia di Testnet Mumbai serta Polygon Mainnet**.

**Jembatan Polygon menyediakan mekanisme jembatan yang hampir sejalan dengan biaya rendah, dan cukup fleksibel**. Polygon menggunakan arsitektur konsensus-ganda (Plasma + platform Proof-of-Stake (PoS)
untuk optimis untuk kecepatan dan desentralisasi. Kami dengan sadar merancang sistem untuk mendukung transisi kondisi arbitrer di rantai sisi kami, yang didukung EVM.

**Tidak ada perubahan terhadap pasokan token yang bersirkulasi ketika melintasi jembatan**;

- Token yang meninggalkan jaringan Ethereum terkunci dan jumlah token yang sama dicetak di Polygon sebagai tanda yang dipatok (1:1).
- Untuk memindahkan token kembali ke jaringan ethereum, token dibakar di jaringan Polygon dan dibuka kuncinya di jaringan ethereum selama prosesnya.

## PoS vs Plasma {#pos-vs-plasma}

|                                      | Jembatan PoS (Disarankan) | Jembatan Plasma |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Deskripsi singkat** | Developer yang mencari fleksibilitas dan penarikan yang lebih cepat dengan keamanan sistem POS. | Pengembang DApp mencari peningkatan jaminan keamanan dengan Plasma exit mechanism\. |
| **Struktur** | Sangat fleksibel | Kaku, Kurang Fleksibel |
| **Deposit\(Ethereum → Polygon\)** | 22-30 menit | 22-30 menit |
| **Withdrawal\(Polygon → Ethereum\)** | 1 checkpoint = ~ 30 menit ke 6 | Panggil ke prosedur keluar-proses di kontrak Ethereum |
| **Keamanan** | Sistem Proof\-of\-Stake yang dijamin oleh seperangkat validator eksternal yang tangguh\. | Kontrak Plasma Polygon memanfaatkan keamanan Ethereum. |
| **Standar Dukungan** | ETH, ERC20, ERC721, ERC1155, dan Lainnya | Hanya ETH, ERC20, ERC721 |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md) adalah jenis jembatan lain yang sangat mirip dengan Jembatan PoS. Mereka berbagi karakteristik yang sama seperti yang disebutkan untuk PoS dalam tabel di atas. Satu-satunya perbedaan adalah bahwa Tokens tidak perlu dipetakan di Jembatan FxPortal sebelum menjembatani. Pemetakan terjadi selama transaksi deposit pertama yang diinisiasikan untuk token yang diberikan. Juga, siapapun dapat menggunakan FxPortal untuk membangun terowongan kustom mereka sendiri di atas jembatan Polygon. Hal ini sangat direkomendasikan untuk menggunakan FxPortal untuk kasus penggunaan jembatan. Pemetakan token baru pada PoS dan Plasma akan diputus setelah Jan 31 2023 sehingga proses pemetakan sepenuhnya terdesentralisasi dan fleksibel.

:::

## Sumber Daya Tambahan {#additional-resources}

- [Pengantar Bridge Blockchain](https://ethereum.org/en/bridges/)
- [Apa yang Jembatan Cross-Chain](https://www.alchemy.com/overviews/cross-chain-bridges)
