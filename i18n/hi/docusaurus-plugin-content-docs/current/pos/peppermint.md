---
id: peppermint
title: Peppermint
description: Peppermint एक संशोधित Peppermint Tendermint है
keywords:
  - docs
  - matic
  - polygon
  - tendermint
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Peppermint {#peppermint}

Peppermint एक संशोधित Tendermint है. इसे एथेरेयम पतों के साथ कॉम्पैटिबल बनाने और एथेरेयम चेन में वेरिफ़ाई करने लायक बनाने के लिए बदला गया है.

## ओवरव्यू {#overview}

1. सिग्नेचर स्कीम में बदलाव
2. एथेरेयम स्मार्ट कॉन्ट्रैक्ट पर इसे वेरिफ़ाई करने लायक बनाने के लिए `vote` में बदलाव
3. `vote` एनकोडिंग स्कीम में बदलाव

Peppermint solidity स्मार्ट कॉन्ट्रैक्ट पर टेंडरमिंट वोटों को सत्यापित करने के लिए `secp256k1`सिग्नेचर स्कीम का इस्तेमाल करता है.

Source: [https://github.com/matticnetwork/ttermint/blob/peppermint/rypt/crypt/secp256k1/secp256k1_noo .](https://github.com/maticnetwork/tendermint/blob/peppermint/crypto/secp256k1/secp256k1_nocgo.go)

यह ब्लॉक में ट्रांज़ैक्शनों के लिए `hash` हासिल करने के लिए `Vote` और `Proposal` स्ट्रक्चर में `Data` फ़ील्ड को जोड़ता है. स्मार्ट कॉन्ट्रैक्ट पर, यह इस बात की जाँच करता है कि क्या `Data` चेकपॉइंट डेटा हैश और वैलिडेटर सिग्नेचर के बहुमत (⅔+1) से मेल खाता है या नहीं. इसका उद्देश्य यह वेरिफ़ाई करने का है कि क्या अधिकांश वैलिडेटर समूह अनुबंध में ट्रांज़ैक्शन पर सहमत होता है या नहीं.

Peppermint `Vote` बाइट पाने के लिए एमिनो एनकोडिंग के बजाय RLP का इस्तेमाल करता है. यहाँ ब्लॉक के `Txs.Hash()`लिए `Data`है.

Source: [https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go](https://github.com/maticnetwork/tendermint/blob/peppermint/types/canonical.go)

```go
// [peppermint] create RLP vote to decode in contract
type CanonicalRLPVote struct {
	ChainID string
	Type    byte
	Height  uint
	Round   uint
	Data    []byte
}
```

और वोट पर सिग्नेचर के लिए बाइट डेटा हासिल करने के लिए RLP एनकोडिंग लाइब्रेरी का इस्तेमाल कर रहा है.

[स्रोत:/github.com/matticnetwork/ttermmint/blob/peppermint/type/vote.go#L75-L82](https://github.com/maticnetwork/tendermint/blob/peppermint/types/vote.go#L75-L82)

```go
func (vote *Vote) SignBytes(chainID string) []byte {
	// [peppermint] converted from amino to rlp
	bz, err := rlp.EncodeToBytes(CanonicalizeVote(chainID, vote))
	if err != nil {
		panic(err)
	}
	return bz
}
```

पूरा स्रोत: [https://github.com/maticnetwork/tendermint](https://github.com/maticnetwork/tendermint)
