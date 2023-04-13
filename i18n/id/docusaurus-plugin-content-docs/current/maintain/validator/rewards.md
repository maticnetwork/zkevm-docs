---
id: rewards
title: Imbalan
sidebar_label: Rewards
description: Pelajari tentang insentif staking Jaringan Polygon.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Untuk pengenalan ke Polygon dan algoritme Proof of Stake , lihat [Apa Yang Proof of](/docs/home/polygon-basics/what-is-proof-of-stake) Stake

Di Polygon, validator men-stake token MATIC mereka sebagai jaminan untuk bekerja demi keamanan jaringan, dan sebagai ganti atas layanannya, mereka mendapatkan imbalan.

Untuk memanfaatkan ekonomi Polygon, Anda harus menjadi validator atau delegator.

Untuk menjadi [validator](/docs/maintain/glossary.md#validator), Anda perlu untuk **menjalankan node validator penuh** and men-stake MATIC. Lihat [Validasi](/docs/maintain/validate/validator-index).

Juga periksa halaman [tanggung jawab](/docs/maintain/validate/validator-responsibilities) Validator.

Untuk menjadi [delegator](/docs/maintain/glossary.md#delegator), Anda hanya perlu untuk **mendelegasikan MATIC ke validator**. Lihat [Delegasi](/docs/maintain/delegate/delegate).

## Apa itu insentif? {#what-is-the-incentive}

Polygon mengalokasikan 12% dari total pasokan 10 miliar token untuk mendanai imbalan staking. Ini untuk memastikan bahwa jaringan dipersiapkan dengan cukup baik sampai biaya transaksi mendapatkan daya tarik. Imbalan ini terutama dimaksudkan untuk memulai jaringan tersebut, sedangkan protokol dalam jangka panjang dimaksudkan untuk menopang dirinya sendiri berdasarkan biaya transaksi.

**Imbalan Validator = Imbalan Staking + Biaya Transaksi**

Ini dialokasikan sedemikian rupa untuk memastikan pemisahan bertahap imbalan staking dari menjadi komponen dominan dari imbalan validator.

| Tahun | Stake target (30% dari pasokan yang beredar) | Tarif Imbalan untuk Bonding 30% | Kumpulan Imbalan |
|---|---|---|---|
| Pertama | 1.977.909.431 | 20% | 312.917.369 |
| Kedua | 2.556.580.023 | 12% | 275.625.675 |
| Ketiga | 2.890.642.855 | 9% | 246.933.140 |
| Keempat | 2.951.934.048 | 7% | 204.303.976 |
| Kelima | 2.996.518.749 | 5% | 148.615.670 + **11.604.170** |

Di bawah ini adalah contoh snapshot dari imbalan tahunan yang diharapkan untuk 5 tahun pertama dengan mempertimbangkan pasokan yang di-stake mulai dari 5% hingga 40% pada interval 5%

| % dari pasokan yang beredar di-stake | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| Imbalan tahunan untuk tahun |
| Pertama | 120% | 60% | 40% | 30% | 24% | 20% | 17,14% | 15% |
| Kedua | 72% | 36% | 24% | 18% | 14,4% | 12% | 10,29% | 9% |
| Ketiga | 54% | 27% | 18% | 13,5% | 10,8% | 9% | 7,71% | 6,75% |
| Keempat | 42% | 21% | 14% | 10,5% | 8,4% | 7% | 6% | 5,25% |
| Kelima | 30% | 15% | 10% | 7,5% | 6% | 5% | 4,29% | 3,75% |

## Siapa yang mendapatkan insentif? {#who-gets-the-incentives}

Staker yang menjalankan node validator dan staker yang mendelegasikan token ke validator yang mereka sukai.

Validator memiliki opsi untuk membebankan komisi tentang imbalan yang diperoleh oleh delegator.

Dana milik semua staker terkunci dalam kontrak yang disebarkan di Ethereum mainnet.

Tidak ada validator yang memegang hak atas token delegator.

## Imbalan staking {#staking-rewards}

Insentif tahunan adalah mutlak - terlepas dari stake keseluruhan atau target nilai bonding di jaringan, jumlah insentif diberikan sebagai imbalan untuk semua penandatangan secara berkala.

Di Polygon, ada elemen tambahan untuk melakukan [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction) berkala ke Ethereum mainnet. Ini adalah bagian utama dari tanggung jawab validator dan mereka diberi insentif untuk melakukan aktivitas ini. Ini merupakan biaya untuk validator yang unik pada solusi Lapisan 2 seperti Polygon. Kami berusaha untuk mengakomodasi biaya ini dalam mekanisme pembayaran imbalan staking validator sebagai bonus yang harus dibayarkan ke [pengusul](/docs/maintain/glossary.md#proposer), yang bertanggung jawab untuk melakukan titik periksa. Imbalan tanpa bonus akan dibagikan di antara semua staker; pengusul, dan [penandatangan](/docs/maintain/glossary.md#signer-address) secara proporsional.

## Mendorong pengusul untuk menyertakan semua tanda tangan {#encouraging-the-proposer-to-include-all-signatures}

Untuk menikmati bonus sepenuhnya, [pengusul](/docs/maintain/glossary.md#proposer) harus menyertakan tanda tangan di [titik periksa](/docs/maintain/glossary.md#checkpoint-transaction). Karena protokol menginginkan bobot ⅔ +1 dari total stake, titik periksa diterima bahkan dengan 80% suara. Namun, dalam hal ini, pengusul hanya mendapatkan 80% dari bonus yang dihitung.

## Biaya transaksi {#transaction-fees}

Setiap produsen blok di [Bor](/docs/maintain/glossary.md#bor) diberikan persentase tertentu dari biaya transaksi yang dikumpulkan di setiap blok. Pemilihan produsen untuk rentang tertentu juga tergantung pada rasio validator dalam stake keseluruhan. Biaya transaksi yang tersisa mengalir melalui saluran yang sama dengan imbalan yang dibagikan di antara semua validator yang bekerja di lapisan [Heimdall](/docs/maintain/glossary.md#heimdall).
