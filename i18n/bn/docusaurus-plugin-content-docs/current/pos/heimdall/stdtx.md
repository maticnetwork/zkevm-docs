---
id: stdtx
title: StdTx
description: ফি এবং সিগনেচারে একটি Msg মোড়ানো একটি স্ট্যান্ডার্ড উপায়
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

Heimdall-এর `StdTx` প্রতিটি লেনদেনের জন্য `Fee` ব্যবহার করে না। আমাদের খুব সীমিত ধরনের লেনদেন রয়েছে এবং যেহেতু অন্তিম ব্যবহারকারীরা Heimdall-এ কোন ধরনের চুক্তি নিয়োগ করবেন না, তাই লেনদেনের জন্য এটি স্থায়ী মডেল ব্যবহার করছে।

এখানে চেক করুন: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

সূত্র: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)