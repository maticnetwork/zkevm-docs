---
id: types
title: Türler
description: HeimdallAddress, Pubkey ve HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Türler {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress`heimdall üzerinde adresi temsil eder. Adres için Ethereum'un ortak kütüphanesini kullanır. Bu adresin uzunluğu 20 byte'tır.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Bu kod, Heimdall'da kullanılan genel anahtarı, `ecdsa`uyumlu sıkıştırılmamış genel anahtarda kullanılır.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Heimdall içinde hash'i temsil eder. Ethereum'un hash özelliğini aynı şekilde kullanır.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
