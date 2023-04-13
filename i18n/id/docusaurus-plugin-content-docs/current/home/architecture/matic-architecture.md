---
id: polygon-architecture
title: Arsitektur PoS Polygon
description: Arsitektur Polygon PoS termasuk rantai Heimdall dan Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Arsitektur PoS Polygon {#polygon-pos-architecture}

Jaringan Polygon adalah platform aplikasi blockchain yang menyediakan hibrida Proof-of-Stake dan rantai sisi yang mendukung Plasma.

Secara arsitektur, keindahan Polygon adalah desain elegan, yang menampilkan lapisan validasi generik yang dipisahkan dari lingkungan eksekusi seperti full-blown EVM sidechains dan pendekatan lapisan 2 seperti sidechains rollup.

Untuk mengaktifkan mekanisme PoS pada platform kami, serangkaian kontrak manajemen **staking** ditempatkan pada Ethereum, termasuk sekumpulan validator insentif yang menjalankan node **Heimdall** dan **Bor**. Ethereum adalah basechain pertama yang didukung Polygon, tetapi Polygon bermaksud menawarkan dukungan untuk lebih banyak basechain, berdasarkan saran dan konsensus komunitas, untuk mengaktifkan platform blockchain Lapisan 2 terdesentralisasi yang dapat dioperasikan.

PoS Polygon memiliki arsitektur dengan tiga lapisan:

1. Kontrak cerdas staking di Ethereum
2. Heimdall (lapisan Proof of Stake)
3. Bor (lapisan Produsen blok)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Kontrak cerdas Polygon (di Ethereum) {#polygon-smart-contracts-on-ethereum}

Polygon menjaga serangkaian kontrak cerdas di Ethereum, yang menangani hal-hal berikut:

- Manajemen Staking untuk lapisan Proof-of-Stake
- Manajemen delegasi termasuk bagian validator
- Titik periksa/snapshot dari kondisi rantai sisi

### Heimdall (lapisan validator Proof-of-Stake) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** adalah node validator PoS yang bekerja sesuai dengan kontrak Staking di Ethereum untuk mengaktifkan mekanisme PoS di Polygon. Kami telah mengimplementasikan ini dengan membangun di atas mesin konsensus Tendermint dengan perubahan-perubahan pada skema tanda tangan dan berbagai struktur data. Heimdall bertanggung jawab untuk validasi blok, pemilihan komite produsen blok, pemeriksaan representasi blok rantai sisi ke Ethereum dalam arsitektur kami, dan berbagai tanggung jawab lainnya.

Lapisan Heimdall menangani agregasi blok yang dihasilkan oleh Bor ke dalam pohon Merkle dan menerbitkan root Merkle secara berkala ke rantai root. Penerbitan periodik ini `checkpoints`disebut Untuk setiap beberapa blok di Bor, validator (pada lapisan Heimdall):

1. Memvalidasi semua blok sejak titik periksa terakhir
2. Membuat pohon merkle dari hash blok
3. Menerbitkan root merkle ke rantai utama

Titik periksa penting untuk dua alasan:

1. Menyediakan finalitas pada Rantai Root
2. Menyediakan proof of burn dalam penarikan aset

Gambaran umum dari proses ini dapat dijelaskan sebagai berikut:

- Sebagian validator aktif dari kelompok ini dipilih untuk bertindak sebagai produsen blok untuk suatu rentang. Pemilihan dari setiap rentang juga akan disetujui oleh sekurang-kurangnya 2/3 dari yang berkuasa. Produser blok ini bertanggung jawab untuk membuat blok dan menyiarkannya ke jaringan yang tersisa.
- Sebuah titik periksa mencakup root dari semua blok yang dibuat selama interval tertentu. Semua node memvalidasi hal yang sama dan melampirkan tanda tangan mereka padanya.
- Sebuah proposal yang dipilih dari set validator bertanggung jawab untuk mengumpulkan semua tanda tangan untuk titik pemeriksaan tertentu dan melakukan hal yang sama pada rantai utama.
- Tanggung jawab untuk membuat blok dan juga mengusulkan titik periksa secara berubah-ubah tergantung pada rasio stake dari validator di kelompok secara keseluruhan.

### Bor (Lapisan Produsen Blok) {#bor-block-producer-layer}

Bor adalah lapisan produsen blok Polygon - entitas yang bertanggung jawab untuk menggabungkan transaksi ke dalam blok.

Produsen blok secara berkala diacak melalui pemilihan komite di Heimdall dalam jangka waktu yang disebut sebagai `span` di Polygon. Blok diproduksi di node **Bor** dan VM rantai sisi bersifat kompatibel dengan EVM. Blok yang diproduksi di Bor juga divalidasi secara berkala oleh node Heimdall, dan titik periksa yang terdiri dari hash pohon Merkle dari serangkaian blok di Bor dimasukkan ke Ethereum secara berkala.

### Sumber daya {#resources}

- [Arsitektur Bor](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Arsitektur Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Mekanisme Titik Periksa](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
