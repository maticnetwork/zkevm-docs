---
id: types
title: タイプ
description: HeimdallAddress、Pubkey、およびHeimdallHashの説明
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# タイプ {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress`は、Heimdallのアドレスを表します。これはアドレス用にEthereumの共通ライブラリを使用しています。このアドレスの長さは、20バイトです。

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Heimdallで使用される公開鍵、互換`ecdsa`性のない公開鍵を表します。

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

これはHeimdallのハッシュを表しています。これは同様にEthereumのハッシュを使用しています。

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
