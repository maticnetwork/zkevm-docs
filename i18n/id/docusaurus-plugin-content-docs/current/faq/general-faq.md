---
id: general-faq
title: FAQ Umum
description: Pertanyaan umum di jaringan Polygon.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Apa itu Jaringan Poligon? {#what-is-polygon-network}

Jaringan Polygon adalah solusi penskalaan Lapisan 2 yang mencapai skala dengan memanfaatkan rantai sisi untuk komputasi off-chain, sambil memastikan keamanan dan desentralisasi aset melalui validator Proof-of-Stake (PoS).

Lihat juga [Apa Itu Polygon](/docs/home/polygon-basics/what-is-polygon).

## Apa itu Proof of Stake (PoS)? {#what-is-proof-of-stake-pos}

Proof-of-Stake adalah sebuah sistem di mana jaringan blockchain bertujuan untuk mencapai konsensus terdistribusi. Siapa pun yang memiliki jumlah token yang cukup dapat mengunci mata uang kripto mereka dan insentif ekonominya berada pada nilai bersama dari jaringan terdesentralisasi. Individu-individu yang melakukan staking mata uang kripto mereka memvalidasi transaksi dengan memberikan suara pada transaksi yang sama sementara konsensus dicapai ketika transaksi atau sekumpulan transaksi di satu blok atau sekumpulan blok di satu titik periksa menerima cukup suara. Ambang batasnya menggunakan bobot untuk stake yang masuk dengan setiap suara. Misalnya, di Polygon, konsensus dicapai untuk melakukan titik periksa blok Polygon ke jaringan Ethereum, ketika setidaknya ⅔ +1 dari total kekuatan staking memberikan suaranya.

Lihat juga [Apa Itu Proof of Stake](/docs/home/polygon-basics/what-is-proof-of-stake).

## Peran apa yang dimainkan Proof-of-Stake dalam arsitektur Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Lapisan Proof-of-Stake di arsitektur Polygon memiliki 2 tujuan berikut:

* Bertindak sebagai lapisan pemberi insentif untuk menjaga agar rantai Plasma tetap berfungsi, terutama mengurangi masalah pelik ketidaktersediaan data.
* Menerapkan jaminan keamanan Proof-of-Stake untuk transisi kondisi yang tidak tertangani oleh Plasma.

## Apa perbedaan PoS Polygon dengan sistem serupa lainnya? {#how-is-polygon-pos-different-from-other-similar-systems}

PoS Polygon berbeda dalam hal bertujuan ganda — memberikan jaminan ketersediaan data untuk rantai Plasma yang menangani transisi kondisi melalui Predikat Plasma, termasuk memberikan validasi Proof-of-Stake untuk kontrak cerdas generik di EVM.

Arsitektur Polygon juga memisahkan proses produksi dan validasi blok menjadi 2 lapisan yang berbeda. Validator sebagai produsen blok membuat blok-blok sesuai namanya pada rantai Polygon untuk konfirmasi parsial yang lebih cepat (<2 detik), sementara konfirmasi akhir dicapai setelah titik periksa dilakukan pada rantai utama dengan interval tertentu, periode yang lamanya dapat bervariasi tergantung pada beberapa faktor seperti kemacetan Ethereum atau jumlah transaksi Polygon. Dalam kondisi ideal, periode ini sekitar 15 menit hingga 1 jam.

Titik periksa pada dasarnya adalah akar Merkle dari semua blok yang dihasilkan di antara interval. Validator melakukan banyak peran, membuat blok di lapisan produsen blok, berpartisipasi dalam konsensus dengan menandatangani semua titik periksa, dan melakukan titik periksa saat bertindak sebagai pengusul. Probabilitas validator menjadi produsen blok atau pengusul tergantung pada rasio stake mereka di kumpulan keseluruhan.

## Mendorong pengusul untuk memasukkan semua tanda tangan {#encouraging-the-proposer-to-include-all-signatures}

Untuk memanfaatkan bonus pengusul sepenuhnya, pengusul harus memasukkan semua tanda tangan di titik periksa. Karena protokol menginginkan bobot 2/3+1 dari total stake, titik periksa akan diterima bahkan dengan 80% suara. Namun, dalam hal ini, pengusul hanya mendapat 80% dari bonus yang dihitung.

## Bagaimana mengajukan tiket dukungan atau berkontribusi pada dokumentasi Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Jika menurut Anda ada sesuatu yang perlu diperbaiki pada dokumentasi kami atau Anda bahkan ingin menambahkan informasi baru di sini, Anda dapat [mengajukan masalah pada repositori Github](https://github.com/maticnetwork/matic.js/issues). [Readme file](https://github.com/maticnetwork/matic-docs/blob/master/README.md) di repositori juga memberikan Anda beberapa saran tentang cara berkontribusi pada dokumentasi kami.

Jika masih perlu bantuan, Anda bisa hubungi **tim dukungan kami** kapan saja.
