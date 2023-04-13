---
id: stdtx
title: StdTx
description: Un modo standard per avvolgere una Msg con le commissioni e le firme
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

`StdTx` di Heimdall non sta usando `Fee` per ogni transazione. Abbiamo tipi molto limitati di transazioni e poiché gli utenti finali non distribuiranno alcun tipo di contratto su Heimdall, utilizzerà un modello a commissione fissa per la transazione.

Fai clic qui: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Sorgente: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)