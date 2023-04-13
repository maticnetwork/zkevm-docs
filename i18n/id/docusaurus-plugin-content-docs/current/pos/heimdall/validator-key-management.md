---
id: validator-key-management
title: Pengelolaan kunci validator
description: Manajer validator dan pemilik kunci
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Pengelolaan kunci validator {#validator-key-management}

Setiap validator menggunakan dua kunci untuk mengelola kegiatan yang terkait di Polygon. Kunci penandatangan disimpan di node dan umumnya dianggap sebagai dompet `hot`, sedangkan kunci pemilik seharusnya disimpan dengan sangat aman, digunakan sesekali, dan umumnya dianggap sebagai dompet `cold`. Dana yang di-stake dikendalikan oleh kunci pemilik.

Pemisahan tanggung jawab ini telah dilakukan untuk memastikan perdagangan yang efisien antara keamanan dan kemudahan penggunaan. Kedua kunci adalah alamat yang kompatibel dan bekerja dengan cara yang sama. Dan ya, mungkin memiliki kunci yang sama dan Signer.

## Kunci penandatangan {#signer-key}

Kunci signer adalah alamat yang digunakan untuk menandatangani blok Heimdall, pos pemeriksaan, dan penandatanganan kegiatan terkait. Kunci pribadi dari kunci ini akan berada di node Validator untuk tujuan penandatanganan. Kunci ini tidak dapat mengelola stake, imbalan, atau delegasi.

validator harus menyimpan dua jenis keseimbangan pada alamat ini:

- Token matic di Heimdall (melalui transaksi Isi Ulang) untuk melakukan tanggung jawab validator di Heimdall
- ETH di rantai Ethereum untuk mengirimkan titik periksa di Ethereum

## Kunci pemilik {#owner-key}

Kunci pemilik adalah alamat yang digunakan untuk staking, staking, mengubah kunci staking, menarik penny, menarik ke atas dan mengelola parameter terkait pada rantai Ethereum. Apa pun yang terjadi, kunci pribadi untuk kunci ini harus diamankan.

Semua transaksi melalui kunci ini akan dilakukan pada rantai Ethereum.

## Perubahan penandatangan {#signer-change}

Peristiwa berikut dibuat jika terjadi perubahan penandatangan di rantai Ethereum pada `StakingInfo.sol`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Jembatan Heimdall memproses peristiwa-peristiwa ini dan mengirimkan transaksi di Heimdall untuk mengubah kondisi berdasarkan peristiwa-peristiwa tersebut.