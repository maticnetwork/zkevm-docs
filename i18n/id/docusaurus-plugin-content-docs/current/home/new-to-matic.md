---
id: new-to-polygon
title: Selamat datang di Polygon
description: Membuka aplikasi blockchain berikutnya di Polygon
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Selamat datang di Polygon {#welcome-to-polygon}

Polygon adalah solusi penskalaan untuk blockchain publik. Polygon PoS mendukung semua alat Ethereum yang ada dan dibarengi transaksi yang lebih cepat dan lebih murah.

## Tipe Interaksi di Polygon {#types-of-interaction-on-polygon}

* [Rantai PoS Polygon](/docs/develop/getting-started)
* [Ethereum + Polygon dengan jembatan PoS](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon dengan jembatan Plasma](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## Kueri blockchain {#query-the-blockchain}

Kebanyakan interaksi blockchain melibatkan membaca keadaannya.

Alchemy menawarkan panduan tentang bagaimana membuat permintaan dasar ke blockchain. Periksa panduan mereka tentang [cara mengkueri Polygon](https://docs.alchemy.com/reference/polygon-sdk-examples).

## Sebar kontrak cerdas {#deploy-smart-contracts}

* Tempatkan Kontrak Anda di Polygon
    - [Menggunakan Alchemy](/docs/develop/alchemy)
    - [Menggunakan Chainstack](/docs/develop/chainstack)
    - [Menggunakan QuickNode](/docs/develop/quicknode)
    - [Menggunakan Remix](/docs/develop/remix)
    - [Menggunakan Truffle](/docs/develop/truffle)
    - [Menggunakan Hardhat](/docs/develop/hardhat)

:::note

Atur RPC-URL Web3 ke "https://rpc-mumbai.matic.today", yang lain tetap sama.

:::

## Apa itu Blockchain? {#what-is-a-blockchain}

Sederhananya, Blockchain adalah buku besar bersama dan tidak dapat diubah untuk mencatat transaksi, melacak aset, dan membangun kepercayaan. Kunjungi [Dasar-Dasar Blockchain](blockchain-basics/basics-blockchain.md) untuk mengetahui lebih lanjut.

## Apa itu Sidechain? {#what-is-a-sidechain}

Bayangkan Sidechain sebagai klona dari blockchain 'induk', yang mendukung transfer aset ke dan dari rantai utama. Sidechain secara sederhana adalah alternatif untuk rantai induk yang membuat blockchain baru dengan mekanisme pembuatan bloknya sendiri (mekanisme konsensus). Menghubungkan sidechain ke rantai induk melibatkan pengaturan metode pemindahan aset di antara kedua rantai.

## Peran validator dan delegator {#validator-and-delegator-roles}

Di Jaringan Polygon, Anda dapat menjadi validator atau delegator. Lihat:

* [Siapa itu Validator](/docs/maintain/polygon-basics/who-is-validator)
* [Siapa itu Delegator](/docs/maintain/polygon-basics/who-is-delegator)

## Arsitektur {#architecture}

Jika tujuan Anda adalah menjadi seorang validator, penting agar Anda memahami arsitektur Polygon.

Lihat [Arsitektur Poligon](/docs/maintain/validator/architecture).

### Komponen {#components}

Untuk lebih terperinci memahami arsitektur Polygon, lihat komponen inti:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Kontrak](/docs/pos/contracts/stakingmanager)

#### Codebase {#codebases}

Untuk memiliki pemahaman terperinci tentang komponen inti, lihat codebase:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Kontrak](https://github.com/maticnetwork/contracts)

## Bagaimana Caranya {#how-tos}

### Pengaturan node {#node-setup}

Jika Anda ingin menjalankan node penuh pada Polygon Mainnet atau Mumbai Testnet, Anda dapat mengikuti Jalankan panduan [Validator Node](/maintain/validate/run-validator.md)

### Pengoperasian staking {#staking-operations}

* [Pengoperasian Staking Validator](/docs/maintain/validate/validator-staking-operations)
* [Delegasi](/docs/maintain/delegate/delegate)

### Sumber Daya Eksternal {#external-resources}
- [dApp pertama Anda](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Sidechains dan Childchain](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)