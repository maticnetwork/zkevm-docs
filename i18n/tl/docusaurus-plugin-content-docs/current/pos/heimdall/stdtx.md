---
id: stdtx
title: StdTx
description: Isang karaniwang paraan para magbalot ng Msg gamit ang Fee at Mga Lagda
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Hindi ginagamit ng Heimdall `StdTx`ang`Fee` para sa bawat transaksyon. Mayroon kaming napakalimitadong uri ng mga transaksyon at dahil ang mga end-user ay hindi magde-deploy ng anumang uri ng mga kontrata sa Heimdall, ito ay gumagamit ng fixed fee model para sa transaksyon.


Tingnan dito: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)