---
id: types
title: Mga Uri
description: Paglalarawan ng HeimdallAddress, Pubkey, & HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Mga Uri {#types}

## HeimdallAddress {#heimdalladdress}

Kumakatawan ang `HeimdallAddress`sa address sa Heimdall. Ginagamit nito ang common library ng Ethereum para sa Address. Ang haba ng address na ito ay 20 bytes.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Kinakatawan nito ang pampublikong key na ginamit sa Heimdall, `ecdsa`compatible na uncompressed public key.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Kumakatawan ito sa hash sa Heimdall. Ginagamit nito ang hash ng Ethereum para dito.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
