---
id: stdtx
title: StdTx
description: Стандартный способ обернуть Msg с комиссией и подписями
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

`StdTx` Heimdall не использует `Fee` для каждой транзакции. Типы транзакций очень ограничены, и, поскольку конечные пользователи не будут развертывать какие-либо контракты на Heimdall, для транзакции используется модель с фиксированной комиссией.

Подробнее здесь: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Источник: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)