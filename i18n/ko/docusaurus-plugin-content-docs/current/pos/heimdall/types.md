---
id: types
title: 유형
description: Heimdall주소, Pubkey, & HeimdallHash 설명
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# 유형 {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress`는 Heimdall의 주소를 나타냅니다. 이더리움의 공용 라이브러리를 주소로 사용합니다. 이 주소의 길이는 20 바이트입니다.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

`ecdsa`Heimdall에서 사용하는 공개 키를 나타냅니다.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Heimdall에서 해시를 나타냅니다. 동일하게 이더리움의 해시를 사용합니다.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
