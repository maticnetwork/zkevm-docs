---
id: what-is-polygon
title: Apa itu Polygon?
description: Belajar tentang solusi skaling
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) adalah solusi penskalaan Lapisan 2 yang mencapai skala dengan memanfaatkan sidechain untuk komputasi off-chain dan jaringan validator Proof-of-Stake (PoS) yang terdesentralisasi.

Polygon berusaha memecahkan masalah skalabilitas dan ketergunaan namun pada saat bersamaan tidak mengorbankan desentralisas dan pendayagunaan komunitas dan ekosistem pengembang yang sudah ada. Ini bertujuan untuk memperbaiki platform yang ada dengan memberikan skalabilitas dan pengalaman pengguna yang lebih unggul untuk dApps dan fungsi pengguna.

Ini adalah solusi penskalaan untuk blockchain publik. Polygon PoS mendukung semua alat Ethereum yang ada dan dibarengi transaksi yang lebih cepat dan lebih murah.

## Fitur & keunggulan utama {#key-features-highlights}

- **Skalabilitas**: Transaksi cepat, berbiaya rendah, dan aman di sidechain Polygon dengan finalitas yang dicapai pada mainchain dan Ethereum sebagai basechain Lapisan 1 kompatibel yang pertama.
- **Throughput tingg**: Tercapai hingga 10.000 TPS di satu sidechain tunggal di testnet internal; Rantai berganda yang akan ditambahkan untuk penskalaan horizontal.
- **Pengalaman pengguna**: Abstraksi UX dan pengembang yang lancar dari mainchain ke rantai Polygon; aplikasi seluler asli dan SDK dengan dukungan WalletConnect.
- **Keamanan**: Operator rantai Polygon adalah juga staker di dalam sistem PoS.
- **Sidechain publik**: Sidechain Polygon bersifat publik (vs. masing-masing rantai DApp), tanpa izin, dan mampu mendukung banyak protokol.

Sistem Polygon secara sadar dirancang untuk mendukung transisi state yang berubah-ubah pada sidechain Polygon, yang mengaktifkan EVM.

## Peran Delegator dan Validator {#delegator-and-validator-roles}

Anda dapat berpartisipasi pada jaringan polygon sebagai delegator atau validator. Lihat:

* [Siapa itu Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Siapa itu Delegator](/docs/maintain/polygon-basics/who-is-delegator)

## Arsitektur {#architecture}

Jika tujuan Anda adalah menjadi seorang validator, penting agar Anda memahami arsitektur Polygon.

Lihat [Arsitektur Polygon](/docs/maintain/validator/architecture) untuk informasi selengkapnya.

### Komponen {#components}

Untuk memiliki pemahaman terperinci tentang arsitektur Polygon, simak komponen inti:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Kontrak](/docs/pos/contracts/stakingmanager)

#### Codebase {#codebases}

Untuk memiliki pemahaman terperinci tentang komponen inti, simak codebase berikut ini:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Kontrak](https://github.com/maticnetwork/contracts)

## Bagaimana Caranya {#how-tos}

### Pengaturan node {#node-setup}

Jika Anda ingin menjalankan node penuh pada Polygon Mainnet atau Mumbai Testnet, Anda dapat mengikuti Jalankan panduan [Validator Node](/maintain/validate/run-validator.md)

### Pengoperasian staking {#staking-operations}

Simak cara proses staking dilakukan untuk profil validator dan delegator:

* [Pengoperasian Staking Validator](docs/maintain/validate/validator-staking-operations)
* [Delegasi](/docs/maintain/delegate/delegate)
