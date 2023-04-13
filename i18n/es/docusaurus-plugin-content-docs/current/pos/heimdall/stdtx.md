---
id: stdtx
title: StdTx
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)

Heimdall's `StdTx` is not using `Fee` for each transaction. We have very limited types of the transactions and as end-users won't be deploying any kind of contracts on Heimdall, it is using fixed fee model for the transaction.

Check here: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

    // StdTx is a standard way to wrap a Msg with Fee and Signatures.
    type StdTx struct {
        Msg       sdk.Msg      `json:"msg" yaml:"msg"`
        Signature StdSignature `json:"signature" yaml:"signature"`
        Memo      string       `json:"memo" yaml:"memo"`
    }