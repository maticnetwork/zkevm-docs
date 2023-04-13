---
id: who-is-validator
title: Siapa Validator
sidebar_label: Who is a Validator
description: "Peserta dalam jaringan yang menjalankan node Heimdall dan Bor."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Validator adalah peserta dalam jaringan yang mengunci token MATIK dalam sistem dan menjalankan validator Heimdall dan Bor block producer node untuk membantu menjalankan jaringan. Validator mengunci token MATIC mereka sebagai jaminan untuk bekerja demi keamanan jaringan dan sebagai balasan atas layanan mereka, mendapatkan imbalan.

Imbalan didistribusikan ke semua pemilik stake sebanding dengan stake mereka di setiap titik periksa, kecuali pengusul yang mendapatkan bonus tambahan. Saldo imbalan pengguna diperbarui dalam kontrak yang dirujuk saat mengeklaim imbalan.

Stake berisiko dipotong jika node validasi melakukan tindakan buruk seperti penandatanganan ganda yang juga memengaruhi delegator terkait di titik periksa itu.

:::tip

Mereka yang tertarik untuk mengamankan jaringan tetapi tidak menjalankan node penuh dapat berpartisipasi sebagai [delegator](/docs/maintain/glossary.md#delegator).

:::

## Ikhtisar {#overview}

Validator di jaringan Polygon dipilih melalui proses lelang on-chain yang terjadi secara berkala. Validator terpilih ini turut serta sebagai produser dan verifikator blok. Setelah [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction) divalidasi oleh peserta, pembaruan dilakukan pada rantai induk (Ethereum mainnet) yang melepaskan imbalan untuk validator tergantung pada stake mereka di jaringan.

Polygon bergantung pada satu set [validator](/docs/maintain/glossary.md#validator) untuk mengamankan jaringan. Peran validator adalah untuk menjalankan node penuh, [menghasilkan blok](/docs/maintain/glossary.md#block-producer), validasi dan berpartisipasi dalam konsensus, dan melakukan [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) pada mainnet Ethereum. Untuk menjadi validator, seseorang perlu [men-stake](/docs/maintain/glossary.md#staking) token MATIC mereka dengan kontrak manajemen staking yang berada di Ethereum mainnet.

## Komponen inti {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) membaca peristiwa yang dikeluarkan oleh kontrak staking untuk memilih validator untuk set saat ini dengan rasio stake yang diperbarui, yang juga digunakan oleh [Bor](/docs/maintain/glossary.md#bor) sambil memproduksi blok.

[Delegasi](/docs/maintain/glossary.md#delegator) juga dicatat dalam kontrak staking dan pembaruan apa pun dalam kekuatan atau node validasi [alamat penandatangan](/docs/maintain/glossary.md#signer-address) atau permintaan pelepasan ikatan mulai berlaku saat titik periksa berikutnya dilakukan.


## Alur end-to-end untuk validator Polygon {#end-to-end-flow-for-a-polygon-validator}

Validator mengatur node penandatanganan mereka, menyinkronkan data, dan kemudian men-stake token matik mereka pada kontrak staking Ethereum mainnet untuk diterima sebagai validator di set saat ini. Jika slot kosong, validator langsung diterima. Jika tidak, validator harus melalui mekanisme penggantian untuk mendapatkan slot.

:::warning

Terdapat ruang terbatas untuk menerima validator baru. Validator baru hanya dapat bergabung dengan set aktif ketika validator yang sedang aktif tidak terikat. Proses lelang baru untuk pengganti validator akan dilaksanakan.

:::

Produsen blok dipilih dari set validator di mana merupakan tanggung jawab validator yang terpilih untuk memproduksi blok untuk [rentang](/docs/maintain/glossary.md#span) tertentu.

Node di Heimdall memvalidasi blok yang diproduksi, berpartisipasi dalam konsensus, dan melakukan titik periksa di Ethereum mainnet pada interval yang ditentukan.

Probabilitas validator untuk terpilih sebagai produsen blok atau pos [pengusul](/docs/maintain/glossary.md#proposer) titik periksa tergantung pada rasio stake seseorang termasuk delegasi di pool keseluruhan.

Validator menerima imbalan di setiap titik periksa sesuai dengan rasio stake mereka, setelah dikurangi bonus pengusul yang diberikan kepada pengusul titik periksa.

Validator dapat memilih keluar dari sistem kapan saja dan dapat menarik token setelah periode pelepasan ikatan berakhir.

## Ekonomi {#economics}

See [Imbalan](/docs/maintain/validator/rewards).

## Menyiapkan node validasi {#setting-up-a-validator-node}

Lihat [Validasi](/docs/maintain/validate/validator-index).

## Lihat juga {#see-also}

* [Tanggung jawab validator](/docs/maintain/validate/validator-responsibilities)
* [Validasi](/docs/maintain/validate/validator-index)
* [FAQ Validator](/docs/maintain/validate/faq/validator-faq)
