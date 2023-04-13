---
id: stdtx
title: StdTx
description: Một cách chuẩn để gói Ms với Fee và Signatures
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

`StdTx` của Heimdall không sử dụng `Fee`cho mỗi giao dịch. Chúng tôi có rất hạn chế các loại giao dịch và vì người dùng cuối sẽ không triển khai bất kỳ loại hợp đồng nào trên Heimdall, nên nó đang sử dụng mô hình phí cố định cho giao dịch.

Kiểm tra tại đây: [https://github.com/maticnetwork/heimdall/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

Nguồn: [https://github.com/maticnetwork/heimdall/master/type/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)