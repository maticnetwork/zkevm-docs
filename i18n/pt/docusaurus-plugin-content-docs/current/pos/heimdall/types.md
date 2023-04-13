---
id: types
title: Tipos
description: Descrição do HeimdallAddress, Pubkey e HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Tipos {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` representa o endereço no Heimdall. Este usa a biblioteca comum do Ethereum como Endereço. O comprimento desse endereço é de 20 bytes.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Ele representa a chave pública usada na chave pública não compacta e `ecdsa`compatível do Heimdall.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Representa o hash no Heimdall. Este usa hash da Ethereum para o mesmo.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
