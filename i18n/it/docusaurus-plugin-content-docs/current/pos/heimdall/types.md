---
id: types
title: Tipi
description: Descrizione di HeimdallAddress, Pubkey, & HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Tipi {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` rappresenta l'indirizzo su Heimdall. Utilizza la biblioteca comune di Ethereum per l'indirizzo. La lunghezza di questo indirizzo è di 20 byte.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Rappresenta la chiave pubblica utilizzata in Heimdall, una chiave pubblica non compressa `ecdsa`compatibile.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Rappresenta l'hash in Heimdall. Utilizza l'hash di Ethereum per la stessa cosa.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
