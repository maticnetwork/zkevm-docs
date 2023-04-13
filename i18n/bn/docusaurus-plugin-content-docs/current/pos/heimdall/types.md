---
id: types
title: Types
description: HeimdallAddress, Pubkey, & HeimdallHash
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

`HeimdallAddress` Heimdall-এ ঠিকানা উপস্থাপন করে। এটি ঠিকানাটির জন্য Ethereum এর সাধারণ লাইব্রেরি ব্যবহার করে। এই ঠিকানার দৈর্ঘ্য 20 বাইট।

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

এটি Heimdall-এ ব্যবহৃত পাবলিক কী প্রতিনিধিত্ব করে, `ecdsa`যা সামঞ্জস্যপূর্ণ uncompressed পাবলিক কী।

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

এটি Heimdall-এ হ্যাশ উপস্থাপন করে। এটি একই কারণে Ethereum-এর হ্যাশ ব্যবহার করে।

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
