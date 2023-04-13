---
id: stdtx
title: StdTx
description: วิธีมาตรฐานในการห่อเมสเสจพร้อมลายเซ็น
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

`StdTx` ของ Heimdall ไม่ได้ใช้ `Fee` สำหรับแต่ละธุรกรรมเรามีประเภทธุรกรรมที่จำกัดมาก และเนื่องจากผู้ใช้จริงจะไม่ปรับใช้สัญญาใดๆ บน Heimdall จึงใช้รูปแบบค่าธรรมเนียมคงที่สำหรับธุรกรรม

ตรวจสอบที่นี่: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

ที่มา: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)