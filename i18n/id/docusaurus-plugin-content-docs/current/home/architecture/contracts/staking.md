---
id: staking
title: Staking on Polygon
description: Staking on Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Staking on Polygon {#staking-on-polygon}

Untuk Jaringan Polygon, peserta dapat memenuhi syarat untuk menjadi validator jaringan dengan menjalankan node penuh. Insentif utama untuk menjalankan node penuh untuk validator adalah untuk mendapatkan biaya Imamat dan Transaction. Validator yang ikut dalam konsensus untuk Polygon terdorong berpartisipasi karena menerima imbalan blok dan biaya transaksi.

Karena slot validator terbatas untuk jaringan, proses untuk mendapatkan dipilih sebagai validator adalah untuk berpartisipasi dalam lelang rantai yang terjadi pada interval seperti yang didefinisikan [di sini](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Stake {#stake}

Jika slot terbuka, lelang dimulai bagi validator yang berminat:

- Di lelang ini mereka akan menawar lebih tinggi daripada penawaran terakhir yang diberikan untuk slot itu.
- Proses Keikutsertaan dalam Lelang diuraikan di sini:
    - Lelang secara otomatis dimulai setelah slot dibuka.
    - Untuk mulai berpartisipasi dalam lelang, Panggil `startAuction()`
    - Ini akan mengunci aset Anda di Manajer Stack.
    - Jika validator potensial lain melakukan lebih dari stake Anda, maka token akan dikembalikan kepada Anda.
    - Sekali lagi, pertaruhkan untuk memenangkan lelangnya.
- Pada akhir periode lelang, kemenangan penawar tertinggi dan menjadi Validator pada jaringan Polygon.

:::note

Harap menjaga node penuh berjalan jika Anda berpartisipasi dalam lelang.

:::

Proses menjadi validator setelah penawar tertinggi menang slot diuraikan di bawah ini:

- Panggil `confirmAuction()` untuk mengonfirmasi partisipasi Anda.
- Jembatan di Heimdall mendengarkan acara ini dan menyiarkan ke Heimdall.
- Setelah konsensus, validator ditambahkan ke Heimdall tetapi tidak diaktifkan.
- Validator mulai memvalidasi hanya setelah `startEpoch`(didefinisikan [di sini)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Begitu `startEpoch`mencapai validator ditambahkan `validator-set`dan mulai berpartisipasi dalam mekanisme konsensus

:::info Direkomendasikan

Untuk menjamin keamanan stake milik validator, kami menganjurkan validator memberikan alamat `signer` lainnya yang diverifikasi dengan tanda tangan`checkPoint`. Ini adalah untuk menjaga penandatanganan kunci terpisah dari kunci dompet validator sehingga dana dilindungi jika terjadi peretas node.

:::

### Unstake {#unstake}

Unstaking memungkinkan validator keluar dari kolam validator aktif. Untuk memastikan **Partisipasi yang Baik**, saham mereka terkunci selama 21 hari ke depan.

Ketika validator ingin keluar dari jaringan dan berhenti memvalidasi blok dan menundukkan pos pemeriksaan, mereka dapat `unstake`melakukannya. Tindakan ini segera sekarang. Setelah aksi ini, validator dianggap keluar dari set validator aktif.

### Restake {#restake}

Validator juga dapat menambahkan lebih banyak saham ke dalam jumlah mereka untuk mendapatkan hadiah yang lebih dan kompetitif untuk tempat validator dan mempertahankan posisi mereka.
