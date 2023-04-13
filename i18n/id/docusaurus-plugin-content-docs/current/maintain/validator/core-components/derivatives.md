---
id: derivatives
title: Derivatif
description: Delegasi melalui skuat
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon mendukung [delegasi](/docs/maintain/glossary#delegator) melalui bagian validator. Dengan menggunakan desain ini, lebih mudah untuk mendistribusikan imbalan dan memangkas sesuai skala pada kontrak Ethereum mainnet tanpa banyak komputasi.

Delegator mendelegasikan dengan membeli bagian pool terbatas dari validator. Setiap validator memiliki token bagian validator mereka sendiri.

Sebut saja token bagian validator yang dapat dipertukarkan VATIC untuk Validator A. Ketika pengguna mendelegasikan ke Validator A, ia diberikan VATIC berdasarkan nilai tukar pasangan MATIC-VATIC. Saat pengguna memperoleh nilai, nilai tukar menunjukkan bahwa pengguna dapat menarik lebih banyak MATIC untuk setiap VATIC. Saat validator mendapatkan pemotongan, pengguna menarik lebih sedikit MATIC untuk VATIC mereka.

Harap diperhatikan bahwa MATIC adalah token staking. Delegator harus memiliki token MATIC untuk berpartisipasi dalam delegasi.

Awalnya, Delegator D membeli token dari pool spesifik Validator A ketika nilai tukarnya adalah 1 MATIC per 1 VATIC.

Ketika validator diberi imbalan dengan lebih banyak token MATIC, token baru ditambahkan ke pool.

Katakanlah dengan pool 100 token MATIC saat ini, 10 imbalan MATIC ditambahkan ke pool. Karena total pasokan token VATIC tidak berubah karena imbalan tersebut, nilai tukar menjadi 1 MATIC per 0,9 VATIC. Sekarang, Delegator D mendapatkan lebih banyak MATIK untuk jumlah yang sama jika berbagi

## Alur di kontrak {#the-flow-in-the-contract}

`buyVoucher`: Fungsi ini diatributkan saat melakukan proses delegasi pada validator. Pertama-tama, delegasi `_amount` ditransfer ke `stakeManager`, yang sesuai konfirmasi, membuat bagian delegasi mint melalui `Mint` menggunakan `exchangeRate` saat ini.

Nilai tukar dihitung berdasarkan rumus berikut:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Ini adalah fungsi yang dipanggil ketika seorang delegator melepaskan ikatan dari validator. Fungsi ini pada dasarnya memulai proses penjualan voucer yang dibeli selama pendelegasian. Ada periode penarikan yang dipertimbangkan sebelum delegator dapat `claim` token mereka.

`withdrawRewards`: Sebagai seorang delegator, Anda dapat mengeklaim imbalan dengan fungsi `withdrawRewards`.

`reStake`: Restaking dapat dilakukan dengan dua cara: a) delegator dapat membeli lebih banyak bagian menggunakan imbalan `buyVoucher` atau `reStake`. Anda dapat restake dengan staking lebih banyak token ke validator atau restake imbalan yang terkumpul sebagai delegator. Tujuan `reStaking` adalah karena validator delegator sekarang memiliki lebih banyak bagian aktif, mereka akan mendapatkan lebih banyak imbalan, begitu juga delegator.

`unStakeClaimTokens`: Setelah periode penarikan selesai, delegator yang menjual bagiannya dapat mengeklaim token MATIC mereka.

`updateCommissionRate`: Memperbarui % komisi untuk validator. Lihat juga [Operasi Komisi Validator](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Ketika validator mendapatkan imbalan karena mengirimkan [titik periksa](/docs/maintain/glossary#checkpoint-transaction), fungsi ini dipanggil untuk pencairan imbalan antara validator dan delegator.
