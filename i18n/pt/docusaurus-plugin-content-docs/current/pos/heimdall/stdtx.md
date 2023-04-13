---
id: stdtx
title: StdTx
description: Uma maneira padrão de envolver um Msg com Taxas e Assinaturas
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

O `StdTx` do Heimdall não está a usar `Fee` para cada transação. Temos tipos muito limitados de transações e, como os utilizadores finais não vão implementar nenhum tipo de contrato no Heimdall , este usa um modelo de taxa fixa para a transação.

Consulte aqui: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Fonte: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)