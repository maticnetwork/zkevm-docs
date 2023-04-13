---
id: stdtx
title: StdTx
description: Msg'yi Ücret ve İmzayla sarmanın standart bir yolu
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdall `StdTx` her bir işlem için `Fee` kullanmaz. Çok sınırlı sayıda işlem türüne sahibiz ve son kullanıcılar olarak Heimdall üzerinde herhangi bir türde sözleşme düzenlemeyeceğiz; Heimdall işlemler için sabit ücret modelini kullanmaktadır.

Buradan kontrol edin: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Kaynak: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)