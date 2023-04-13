---
id: types
title: Loại
description: Mô tả của HeimdallAdmin, Bước, & Heimdallhash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# Loại {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` đại diện cho địa chỉ trên Heimdall. Nó sử dụng thư viện chung của Ethereum cho Địa chỉ. Độ dài của địa chỉ này là 20 byte.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

Nó tượng trưng cho khóa công khai được sử dụng trong phím công khai Heimdall, sự không được nén `ecdsa`tương thích.

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

Nó đại diện cho hàm băm trong Heimdall. Nó cũng sử dụng hàm băm của Ethereum.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
