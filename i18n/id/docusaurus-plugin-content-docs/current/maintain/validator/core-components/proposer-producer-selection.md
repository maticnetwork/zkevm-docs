---
id: proposers-producers-selection
title: Pemilihan Pengusul dan Produsen
sidebar_label: Proposers & Producers
description: Proposal & blok pemilihan produser pada Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Produsen Blok untuk lapisan BOR adalah komite yang dipilih dari kumpulan validator berdasarkan stake mereka yang dilakukan secara berkala. Interval ini ditentukan oleh tata kelola validator berdasarkan dinasti dan jaringan.

Rasio [stake](/docs/maintain/glossary.md#staking) menentukan probabilitas untuk dipilih sebagai anggota komite [produsen blok](/docs/maintain/glossary.md#block-producer).

## Proses pemilihan {#selection-process}

Misalkan ada 3 validator di pool — Alice, Bill, dan Clara:

* Alice staking 100 token MATIC.
* Bill staking 40 token MATIC.
* Clara staking 40 token MATIC.

Validator diberikan slot sesuai dengan stake-nya.

Karena Alice memiliki 100 token MATIC yang di-stake, dan biaya per slot adalah 10 token MATIC sebagaimana diatur oleh tata kelola validator, Alice mendapatkan total 5 slot. Demikian pula, Bill dan Clara mendapatkan total 2 slot.

Validator Alice, Bill, dan Clara diberikan slot berikut:

* [A, A, A, A, A, B, B, C, C]

Polygon kemudian mengacak susunan slot Alice, Bill, dan Clara dengan menggunakan hash blok Ethereum sebagai seed.

Hasil dari acakan menghasilkan susunan slot berikut:

* [A, B, A, A, C, B, A, A, C]

Sekarang Polygon menggunakan validator dari atas tergantung pada jumlah total produsen blok yang dikelola oleh tata kelola validator — misalnya, untuk satu set yang terdiri dari 5 produsen, susunan slotnya adalah [A, B, A, A, C].

Set produsen untuk rentang berikutnya didefinisikan sebagai [A:3, B:1, C:1].

Menggunakan set validator yang dihasilkan dan [algoritme pemilihan pengusul](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) Tendermint, Polygon memilih produsen untuk setiap sprint di Bor.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Legend:**

* Dinasti: Waktu antara akhir lelang terakhir dan waktu mulai lelang berikutnya.
* Sprint: Interval waktu pemilihan komite produsen blok.
* Rentang: Jumlah blok yang diproduksi oleh satu produsen.
