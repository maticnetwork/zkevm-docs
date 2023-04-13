---
id: types
title: Типы
description: Описание HeimdallAddress, Pubkey и HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Типы {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` представляет адрес в Heimdall. Он использует общую библиотеку Ethereum для Address. Длина этого адреса составляет 20 байт.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Он представляет открытый ключ, используемый в Heimdall, `ecdsa`совместимый с несжатого публичного ключа.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Он представляет хэш в Heimdall. Для этого он использует хэш Ethereum.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
