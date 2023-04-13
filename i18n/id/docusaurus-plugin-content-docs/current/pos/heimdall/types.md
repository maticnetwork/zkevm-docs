---
id: types
title: Jenis
description: Deskripsi HeimdallAddress, Pubkey, & HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Jenis {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` mewakili alamat di Heimdall. Ini menggunakan pustaka umum Ethereum untuk Alamat. Panjang alamat ini adalah 20 byte.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Ini mewakili kunci publik yang digunakan dalam Heimdall, yang `ecdsa`kompatibel tanpa kompresi.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Ini mewakili hash di Heimdall. Menggunakan hash Ethereum untuk Heimdall.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
