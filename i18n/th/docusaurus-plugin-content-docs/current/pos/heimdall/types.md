---
id: types
title: ประเภท
description: คำอธิบายของ Heimdall, Pubkey, และ HeimdallHash
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# ประเภท {#types}

## HeimdallAddress {#heimdalladdress}

`HeimdallAddress` แทนที่อยู่บน Heimdallใช้ไลบรารีทั่วไปของ Ethereum สำหรับที่อยู่ความยาวของที่อยู่นี้คือ 20 ไบต์

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## PubKey {#pubkey}

โดยแสดงถึงคีย์สาธารณะที่ใช้ใน Heimdall ซึ่งใช้งานได้กับ Key สาธารณะที่ไม่มีการบีบอัดที่เข้ากัน`ecdsa`ได้

```go
// PubKey pubkey
type PubKey [65]byte
```

## HeimdallHash {#heimdallhash}

แทนแฮชใน Heimdallใช้แฮชของ Ethereum สำหรับวัตถุประสงค์เดียวกัน

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
