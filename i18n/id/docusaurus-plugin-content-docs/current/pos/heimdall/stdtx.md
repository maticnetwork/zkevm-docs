---
id: stdtx
title: StdTx
description: Cara standar untuk membungkus Msg dengan Fee dan Signature
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

`StdTx` Heimdall tidak menggunakan `Fee` untuk setiap transaksi. Kami memiliki jenis transaksi yang sangat terbatas, dan karena pengguna akhir tidak akan menempatkan kontrak jenis apa pun di Heimdall, maka model biaya tetap digunakan untuk transaksi.

Periksa di sini: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Sumber: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)