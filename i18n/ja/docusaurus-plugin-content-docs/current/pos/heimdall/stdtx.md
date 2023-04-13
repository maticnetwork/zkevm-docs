---
id: stdtx
title: StdTx
description: 手数料と署名でMsgをラップする標準的な方法
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdallの`StdTx`は、各トランザクションに`Fee`を使用していません。私たちは、大変限定したタイプのトランザクションを持ち、エンドユーザーはHeimdall上にいかなるコントラクトもデプロイしないためトランザクションには固定手数料モデルを使用しています。

こちらを確認してください：[https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

出典：[https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)