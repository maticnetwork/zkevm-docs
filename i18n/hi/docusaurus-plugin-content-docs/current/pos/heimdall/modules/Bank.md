---
id: bank
title: बैंक
description: मॉड्यूल हैंडलिंग अकाउंट बैलेंस transfers handling को Heimdall के लिए
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# बैंक मॉड्यूल {#bank-module}

`bank` मॉड्यूल हेम्डल के लिए अकाउंट बैलेंस ट्रांसफ़र्स को संभालता है. यह मॉड्यूल cosmos-SDK वाले `bank` मॉड्यूल से मेल खाता है.

## मैसेज {#messages}

### MsgSend {#msgsend}

`MsgSend` हेम्डल में अकाउंटों के बीच ट्रांसफ़र संभालता है. ट्रांज़ैक्शन मैसेज के लिए एक स्ट्रक्चर ये रहा:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` हेम्डल के लिए अकाउंट के बीच मल्टी ट्रांसफ़र संभालता है.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## पैरामीटर {#parameters}

बैंक मॉड्यूल में नीचे दिए गए पैरामीटर शामिल हैं:

| की/कुंजी | प्रकार | डिफ़ॉल्ट वैल्यू |
|----------------------|--------|------------------|
| `sendenabled` | बूल | ट्रू |

## CLI कमांड्स {#cli-commands}

### बैलेंस भेजें {#send-balance}

निम्नलिखित कमांड का उल्लेख करने के लिए 1000 के मेटिक टोकन `address`भेजेगा;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
