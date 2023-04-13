---
id: stdtx
title: StdTx
description: Une façon standard pour envelopper un Msg avec des frais et des signatures
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Le `StdTx` de Heimdall n'utilise pas `Fee` pour chaque transaction. Nous utilisons des types de transactions très limités et puisque les utilisateurs finaux ne déploieront aucun type de contrat sur Heimdall, nous appliquons un modèle de frais fixes pour la transaction.

Cliquez ici: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)