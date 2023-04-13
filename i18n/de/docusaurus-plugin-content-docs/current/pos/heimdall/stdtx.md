---
id: stdtx
title: StdTx
description: Eine standard eine Msg mit Fee und Signaturen zu wickeln.
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdalls `StdTx` verwendet `Fee` nicht für jede Transaktion. Wie verfügen über eine begrenzte Anzahl von Transaktionsarten und da die Endbenutzer keinerlei Contracts auf Heimdall anwenden werden, wird ein festgelegtes Gebührenmodell für die Transaktion angewendet.

Sieh hier nach: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Quelle: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)