---
id: stdtx
title: StdTx
description: एक Msg को Fee और सिग्नेचर के साथ लपेटने का एक मानक तरीका
keywords:
  - docs
  - matic
  - polygon
  - StdTx
  - wrap a msg with fee
image: https://matic.network/banners/matic-network-16x9.png
---

# StdTx {#stdtx}

हेम्डल का `StdTx`प्रत्येक ट्रांज़ैक्शन के लिए `Fee` का इस्तेमाल नहीं कर रहा है. हमारे पास बहुत सीमित प्रकार के ट्रांज़ैक्शन हैं और चूंकि एंड-यूज़र्स, हेम्डल पर किसी भी प्रकार का कॉन्ट्रैक्ट डिप्लॉय नहीं करेंगे, इसलिए यह ट्रांज़ैक्शन के लिए निश्चित फ़ीस मॉडल का इस्तेमाल कर रहा है.

यहाँ जाँचें: [https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32](https://github.com/maticnetwork/heimdall/blob/master/auth/ante.go#L32)

```go
// StdTx is a standard way to wrap a Msg with Fee and Signatures.
type StdTx struct {
  Msg       sdk.Msg      `json:"msg" yaml:"msg"`
  Signature StdSignature `json:"signature" yaml:"signature"`
  Memo      string       `json:"memo" yaml:"memo"`
}
```

स्रोत: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/stdtx.go)