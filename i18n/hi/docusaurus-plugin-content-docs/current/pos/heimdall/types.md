---
id: types
title: प्रकार
description: HeimdallAddress, पबकी, और HeimdallAddress, का वर्णन
keywords:
  - docs
  - matic
  - HeimdallAddress
  - polygon
  - Pubkey
  - HeimdallHash
image: https://matic.network/banners/matic-network-16x9.png
---

# प्रकार {#types}

## हेम्डल पता {#heimdalladdress}

`HeimdallAddress`हेम्डल पर पता का प्रतिनिधित्व करता है. यह पते के लिए एथेरेयम की कॉमन लाइब्रेरी का इस्तेमाल करता है. इस पते की लंबाई 20 बाइट है.

```go
// HeimdallAddress represents Heimdall address
type HeimdallAddress common.Address
```

## सार्वजनिक की/कुंजी  {#pubkey}

यह Heimdall, जो की uncompressed सार्वजनिक की की को `ecdsa`संगत बनाता है.

```go
// PubKey pubkey
type PubKey [65]byte
```

## हेम्डल हैश {#heimdallhash}

यह हेम्डल में हैश का प्रतिनिधित्व करता है. यह इसके लिए एथेरेयम के हैश का इस्तेमाल करता है.

```go
// HeimdallHash represents heimdall address
type HeimdallHash common.Hash
```
