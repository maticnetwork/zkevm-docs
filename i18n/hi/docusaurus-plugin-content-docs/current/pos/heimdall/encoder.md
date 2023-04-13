---
id: encoder
title: एनकोडर (पल्प)
description: विशेष transactions, का उत्पादन करने के लिए RLP एनकोडिंग जैसे चेकपॉइंट
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# एनकोडर (पल्प) {#encoder-pulp}

हेम्डल को एथेरेयम चेन पर हेम्डल के ट्रांज़ैक्शनों को वेरिफ़ाई करना पड़ता है. उसके लिए यह चेकपॉइंट जैसे खास ट्रांज़ैक्शनों को बनाने के लिए RLP एन्कोडिंग का इस्तेमाल करता है.

यह खास ट्रांज़ैक्शन डिफ़ॉल्ट एमिनो एनकोडिंग के बजाय `pulp` (RLP आधारित) एनकोडिंग का इस्तेमाल करता है.

पल्प इंटरफ़ेस डिकोडिंग को हल करने के लिए एक प्रीफ़िक्स-आधारित आसान एनकोडिंग मैकेनिज्म का इस्तेमाल करता है. `GetPulpHash` तरीका जाँचें.

स्रोत: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

```go
const (
	// PulpHashLength pulp hash length
	PulpHashLength int = 4
)

// GetPulpHash returns string hash
func GetPulpHash(name string) []byte {
	return crypto.Keccak256([]byte(name))[:PulpHashLength]
}
```

नीचे दिया गया एक दिए गए `msg` के लिए प्रीफ़िक्स-बाइट लौटाता है. यहां एक उदाहरण है कि pulp एनकोडिंग, के लिए किसी ऑब्जेक्ट को कैसे रजिस्टर करना चाहिए:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

एनकोडिंग सिर्फ  `GetPulpHash`के RLP एनकोडिंग और prepending हैः`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

डिकोडिंग काम इस प्रकार से करता है:

```go
// retrieve type of objet based on prefix
rtype := typeInfos[hex.EncodeToString(incomingData[:PulpHashLength])]

// create new object
newMsg := reflect.New(rtype).Interface()

// decode without prefix and inject into newly created object
if err := rlp.DecodeBytes(incomingData[PulpHashLength:], newMsg); err != nil {
	return nil, err
}

// result => newMsg
```

:::info अधिक जानकारी के लिए

Cosmos SDK दो बायनरी वायर एनकोडिंग प्रोटोकॉल, [एमिनो](https://github.com/tendermint/go-amino/) और [प्रोटोकॉल बफ़र](https://developers.google.com/protocol-buffers) का इस्तेमाल करता है, जहाँ एमिनो एक ऑब्जेक्ट एनकोडिंग विनिर्देश है. यह इंटरफ़ेस सहायता के लिए एक एक्सटेंशन के साथ Proto3 का सबसेट है. Proto3 पर ज़्यादा जानकारी के लिए [Proto3 के विनिर्देश](https://developers.google.com/protocol-buffers/docs/proto3) देखें, जिसके साथ एमिनो काफी हद तक कॉम्पैटिबल है (लेकिन Proto2 के साथ नहीं).

ज़्यादा जानकारी के लिए यहाँ जाएं: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
