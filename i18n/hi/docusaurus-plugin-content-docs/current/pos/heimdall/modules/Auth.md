---
id: auth
title: Auth
description: बेस transaction base और अकाउंट के प्रकार को निर्दिष्ट करने के लिए मॉड्यूल
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# ऑथ मॉड्यूल {#auth-module}

यह दस्तावेज़ Heimdall. के `auth`मॉड्यूल का वर्णन करता है.

यह `auth`मॉड्यूल एक ऐप्लिकेशन के लिए आधारभूत ट्रांज़ैक्शन और अकाउंट प्रकार को निर्दिष्ट करने के लिए जिम्मेदार है. इसमें ante हैंडलर होता है, जहां सभी बुनियादी ट्रांज़ैक्शन वैलिडिटी जाँच (सिग्नेचर्स, नोंस, ऑग्जीलियरी फील्ड्स) की जाती है और अकाउंट कीपर को एक्सपोज करता है जो अन्य मॉड्यूलों को अकाउंट्स को पढ़ने, लिखने और संशोधित करने की अनुमति देता है.

## गैस और फ़ीस {#gas-and-fees}

फ़ीस, नेटवर्क के एक ऑपरेटर के लिए दो उद्देश्यों को पूरा करती है.

फ़ीस प्रत्येक सम्पूर्ण नोड द्वारा स्टोर किए गए स्टेट के विकास को सीमित करती है और कम आर्थिक वैल्यू वाले ट्रांजैक्शन के सामान्य उद्देश्य सेंसरशिप की अनुमति देती है. फ़ीस एक एंटी-स्पैम मैकेनिज्म के रूप में सबसे उपयुक्त होती है जहां वैलिडेटर्स, यूज़र्स की पहचान और नेटवर्क के उपयोग में अरूचि रखते हैं.

चूंकि Heimdall किसी भी contract के लिए कस्टम कॉन्ट्रैक्ट या कोड का समर्थन नहीं करता है, इसलिए यह निश्चित लागत contract का इस्तेमाल करता है. निश्चित लागत वाले ट्रांज़ैक्शन के लिए, वैलिडेटर, एथेरेयम चेन पर अपने अकाउंट को टॉप अप कर सकता है और [टॉप अप](Topup.md) मॉड्यूल का इस्तेमाल करके हेम्डल पर टोकन प्राप्त कर सकता है.

## प्रकार {#types}

खातों के **अलावा**, (स्टेट में निर्दिष्ट ), auth मॉड्यूल द्वारा उजागर किए गए प्रकार का स्टेट सिग्नेचर हैं, जो एक वैकल्पिक सार्वजनिक की की और एक बाइट ऐरे, StdTx, के रूप में क्रिप्टोग्राफिक सिग्नेचर का संयोजन है जो **StdSignature****,** और S**tdSignDoc,** का इस्तेमाल करके `sdk.Tx`इंटरफेस को इम्प्लांट करता है, जो S**tdTx **के लिए एक रिप्ले की रोकथाम स्ट्रक्चर है जो struct सेंडर्स को over. पर साइन करना पड़ता है.

### StdSignature {#stdsignature}

एक`StdSignature` एक बाइट ऐरे के प्रकार हैं.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

एक `StdTx`एक ऐसा स्ट्रक्चर है जो `sdk.Tx`इंटरफ़ेस को लागू करता है और कई प्रकार के ट्रांज़ैक्शन के उद्देश्यों को पूरा करने के लिए काफी सामान्य हो सकता है.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

एक `StdSignDoc`एक रीप्लै-प्रिवेन्शन स्ट्रक्चर है जिस पर साइन करना होता है, जो सुनिश्चित करता है कि एक हेम्डल पर आने पर ही कोई सबमिट किया गया ट्रांज़ैक्शन (जो एक विशेष बाइट स्ट्रिंग पर बस एक सिग्नेचर है) एग्जीक्यूट हो पाएगा.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### अकाउंट {#account}

यह ट्रांज़ैक्शन के लिए पते, सिक्के और नोंस को मैनेज करता है. यह ट्रांज़ैक्शन को साइन और वैलिडेट भी करता है.

स्रोत: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## पैरामीटर {#parameters}

auth मॉड्यूल में निम्नलिखित पैरामीटर होते हैं:

| की/कुंजी | प्रकार | डिफ़ॉल्ट वैल्यू |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | स्ट्रिंग | "1000000000000000" |


## CLI कमांड्स {#cli-commands}

### अकाउंट दिखाएँ {#show-account}

अकाउंट से संबंधित डेटा को Heimdall; में print ट करना

```bash
heimdalld show-account
```

अपेक्षित परिणाम:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### अकाउंट और सिक्के का विवरण {#account-and-coin-details}

खाता विवरण को दिखाना कि, सिक्कों, अनुक्रम और अकाउंट नंबर को दिखाना

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

अपेक्षित परिणाम:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### पैरामीटर {#parameters-1}

सभी params; को छापने के लिए

```go
heimdallcli query auth params
```

अपेक्षित परिणाम:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| नाम | एंडपॉइंट | वर्णन |
|----------------------|--------|------------------|
| अकाउंट का विवरण | /auth/accounts/{address} | एक पते का सारा विवरण देता है |
| अकाउंट अनुक्रम का विवरण | /auth/accounts/{address}/sequence | साइन करने के लिए केवल आवश्यक विवरण देता है |
| Auth परम | /auth/params | auth मॉड्यूल के उपयोग वाला सभी परम देता है |
