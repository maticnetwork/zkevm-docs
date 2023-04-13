---
id: liquid-delegation
title: Delegasi Likuid
sidebar_label: Liquid Delegation
description: Cara Polygon menggunakan delegasi liquid untuk memelihara jaringan.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Dalam mekanisme Proof Stake tradisional, blockchain menyimpan trek dari satu set validator. Siapapun dapat bergabung dengan peringkat ini atau hak untuk memvalidasi transaksi dengan mengirimkan jenis transaksi yang menunjukkan koin-koin (dalam kasus Ethereum, ETH) dan dimasukkan ke deposit. Setelah itu, proses pembuatan dan menyetujui blok baru dilakukan melalui algoritme konsensus oleh semua validator aktif.

Mereka mengunci bagian dari saham mereka untuk sejumlah waktu (seperti deposit keamanan), dan sebagai imbalannya mereka mendapatkan kesempatan proporsional untuk memilih blok berikutnya.

Menampilkan imbalan didistribusikan sebagai insentif kepada peserta.

## Delegasi {#delegation}

Staking mungkin mahal, menaikkan penghalang untuk masuk, yang lebih disukai orang kaya. Setiap orang harus mengambil bagian dalam keamanan jaringan dan menerima token penghargaan. Satu-satunya pilihan lain adalah untuk bergabung dengan kolam yang mirip dengan kolam renang, di mana validator harus dipercaya. Kami percaya bahwa menempel ke protokol adalah tindakan terbaik untuk delegasi baru. Karena modal dan imbalan terbuka dan dilindungi oleh mekanisme in-protocol

Delegasi dapat mengambil bagian dalam validasi meskipun tidak menyimpan seluruh node. Namun, dengan melakukan staking dengan validator, mereka dapat meningkatkan kekuatan jaringan dan mendapatkan imbalan dengan membayar biaya komisi kecil (yang bervariasi tergantung validator) ke validator pilihan mereka.

## Limitasi Delegator dan Validator Tradisional {#limitation-of-traditional-delegator-and-validator}

Biaya penguncian modal untuk validator dan delegator tinggi karena desain protokol Proof of Stake.

Masih kita dapat membawa mekanisme likuiditas seperti validator NFT dimana partai baru yang ingin menjadi validator dapat membeli validator NFT dari validator yang ingin keluar dari sistem untuk beberapa alasan.

Dalam kasus delegasi, jumlah yang terkunci diasumsikan berada di chunks yang lebih kecil sehingga menjadi cair sehingga partisipasi lebih aktif (yaitu jika beberapa delegasi berpikir bahwa sekarang peluang yang besar di DeFi tetapi modal mereka terkunci dalam kolam staking bahkan untuk penarikan, mereka masih perlu menunggu selama 21 hari).

Juga, mengunci X ETH dalam deposit tidak bebas; itu memerlukan pengorbanan opsional untuk pemegang ETH Sekarang, jika Anda memiliki 1000 ETH, Anda dapat melakukan apa pun yang Anda inginkan dengan itu. Jika Anda menguncinya dalam deposit, maka itu terjebak di sana selama berbulan-bulan untuk mencegah serangan seperti [**tidak ada yang dipertaruhkan**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) dan menghukum validator untuk partisipasi yang buruk.

## Lapisan Aplikasi dalam Protokol vs {#in-protocol-vs-application-layer}

Likuidasi staking tingkat aplikasi memiliki masalah kepercayaan. Likuidasi staking tingkat Protokol lebih dihargai karena fakta bahwa aktor baru dapat memercayainya (yang menarik lebih modal, bahkan dari aktor / delegasi yang lebih kecil).

## Solusi Polygon untuk Delegasi {#polygon-s-solution-for-delegation}

Ketika mengeksplorasi delegasi, kami menyadari bahwa delegasi harus menjadi in-protocol agar lebih dipercaya dari delegasi.

Kami menghadapi masalah yang sama dengan validator likuidator dan berpikir untuk membuatnya sebagai NFT yang dapat menjadi transfer dan mengeksplorasi pikiran serupa seperti bagaimana desain [yang](https://blog.chorus.one/delegation-vouchers/) lebih cair dan sikka-chorus.one menjadi perhatian.

Berpikir dalam hal membuat bagian dari pool validator adalah ide bagus dan karena staking Polygon diimplementasikan pada kontrak cerdas ethereum, ini membuka lebih banyak opsi bagi kami seperti membuatnya kompatibel dengan ERC20 sehingga dapat digunakan dalam protokol defi.

Hingga saat ini setiap validator memiliki VMatic (yaitu untuk validator Ashish akan ada tanda AMatik) karena setiap validator memiliki kinerja yang berbeda (imbalan dan tingkat komisi). Delegator dapat membeli saham validator dan menekan risiko mereka terhadap kinerja validator tertentu.

## Keuntungan {#advantages}

- Karena desain kami mengikuti ERC20 seperti antarmuka dalam implementasi delegasi, aplikasi DeFi dapat dengan mudah dibangun di atasnya.
- Token yang didelegasikan dapat digunakan dalam protokol peminjaman.
- Delegator dapat melindungi risiko mereka melalui pasar prediksi seperti Auger.

Lingkup masa depan:

- Saat ini ERC20 tidak dapat dibedakan dengan validator ERC20 / Share tokens tetapi di masa depan kami pikir banyak aplikasi DeFi yang baru dapat membangun dan membuat beberapa pasar untuk itu atau bahkan beberapa produk yang lebih baik.
- Dengan [chorus.one](http://chorus.one) memprakarsai penelitian, kami juga mengeksplorasi masalah seperti validator yang memotivasi token mereka sendiri dan masalah lainnya (masalah pendek dapat dihindari melalui hal-hal seperti validator mengunci saham mereka untuk X bulan dan hal-hal lain seperti validator asuransi (on-chain) yang akan membawa lebih banyak kepercayaan untuk delegasi).
- Hak pemungutan suara delegator untuk berpartisipasi dalam keputusan pemerintahan.
- Ketika membuat likuidasi delegasi, kami juga ingin memastikan keamanan jaringan. Itu sebabnya dalam beberapa bentuk, modal yang dapat dipotong, terkunci jika terjadi aktivitas penipuan.

Mengingat desain di atas tersedia in-protocol, validator selalu dapat menerapkan mekanisme serupa mereka sendiri dan men-stake melalui kontrak yang tidak akan tersedia di UI staking Polygon.

## Tujuan Masa Depan {#future-goals}

Hal-hal seperti interchain / cross-chain via Cosmos hub dan desain panen Everett B.

## Sumber daya {#resources}

- [Desain pos Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Pengenalan Derivatif Staking](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Kumpulan Staking](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflasi di Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
