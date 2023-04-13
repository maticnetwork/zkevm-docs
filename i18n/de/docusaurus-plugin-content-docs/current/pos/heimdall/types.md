---
id: types
title: Arten
description: Beschreibung von HeimdallAddress, Pubkey und HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Arten {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` steht für Adresse auf Heimdall. Sie greift für die Adresse auf Ethereums gemeinsame Bibliothek zurück. Die Adressenlänge beträgt 20 Bytes.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Er stellt den öffentlichen Key dar, der in Heimdall verwendet wird, dem `ecdsa`kompatiblen unkomprimierten öffentlichen Key ist.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Dies steht für einen Hash auf Heimdall. Er wird wie der Ethereum-Hash verwendet.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
