---
id: types
title: Types
description: Description de HeimdallAddress, Pubkey, & HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Types {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` représente l'adresse sur Heimdall. Il utilise la bibliothèque commune d'Ethereum pour l'Adresse. La longueur de cette adresse est de 20 octets.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Il représente la clé publique utilisée dans Heimdall, la clé publique non compressée `ecdsa`compatible .

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Cela représente l'identifiant dans Heimdall. Cela utilise l'identifiant d'Ethereum également.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
