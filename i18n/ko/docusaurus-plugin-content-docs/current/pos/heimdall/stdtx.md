---
id: stdtx
title: StdTx
description: Fee 및 서명을 사용하여 Mg를 감싸는 표준 방법
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdall의 `StdTx`는 각 트랜잭션에 대해 `Fee`를 지불하지 않습니다. Polygon은 매우 제한된 유형의 트랜잭션을 가지고 있으며, 최종 사용자는 Heimdall에 어떤 종류의 계약도 배포하지 않으므로 트랜잭션에 고정 수수료 모델을 사용하고 있습니다.

다음을 확인하세요: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

출처: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)