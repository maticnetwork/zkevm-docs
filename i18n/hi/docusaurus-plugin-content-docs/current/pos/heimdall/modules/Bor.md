---
id: bor
title: बोर
description: मॉड्यूल Heimdall पर स्पैन मैनेजमेंट को संभालती
keywords:
  - docs
  - matic
  - bor module
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# बोर मॉड्यूल {#bor-module}

बोर मॉड्यूल हेम्डल पर मैनेजमेंट को हैंडल करता है. बोर चेन के वर्तमान ब्लॉक नंबर `n`, वर्तमान स्पान `span` को देखते हुए, यदि `span.StartBlock <= n < span.EndBlock` हो तो किसी भी वैलिडेटर द्वारा हेम्डल पर नया स्पान प्रस्तावित किया जाता है.

## मैसेज {#messages}

### मैसेज प्रपोज स्पान {#msgproposespan}

`MsgProposeSpan`एक दिए गए `span`और दो के लिए वैलिडेटर्स कमेटी को Heimdall स्टेट में एक नए स्पैन को स्टोर करता है.

[स्रोत: https://github.com/matikngnes/heimdall/blob/development/bor/हैंडler.go#L27](https://github.com/maticnetwork/heimdall/blob/develop/bor/handler.go#L27)

```go
// MsgProposeSpan creates msg propose span
type MsgProposeSpan struct {
	ID         uint64                  `json:"span_id"`
	Proposer   hmTypes.HeimdallAddress `json:"proposer"`
	StartBlock uint64                  `json:"start_block"`
	EndBlock   uint64                  `json:"end_block"`
	ChainID    string                  `json:"bor_chain_id"`
}
```

ये देखिए यह ट्रांजैक्शन सभी वैलिडेटरों में से प्रोड्यूसर को कैसे चुनता है:

1. यह वैलिडेटरों की पावर के आधार पर कई स्लॉट बनाता है. उदाहरण: पावर 10 वाले A में 10 स्लॉट होंगे, पावर 20 वाले B में 20 स्लॉट होंगे.
2. सभी स्लॉट के साथ,`shuffle`फंक्शन का इस्तेमाल करके उनमें फेरबदल करता है `seed`और पहले प्रोड्यूसरों`producerCount`को चुनता है. हेम्डल पर `bor`मॉड्यूल सभी वैलिडेटरों में से प्रोड्यूसरों को चुनने के लिए ETH 2.0 शफल अल्गोरिथम का इस्तेमाल करता है. प्रत्येक स्पान के रूप `n`में एथेरेयम (ETH 1.0) ब्लॉक के ब्लॉक हैश का इस्तेमाल `n`करता है`seed`. नोट करें कि स्लॉट आधारित चयन वैलिडेटरों को उनके पावर के आधार पर चुने जाने की अनुमति देता है. अधिक पावर वाले वैलिडेटर के चुने जाने की सम्भावना अधिक होगी. स्रोत: [https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go](https://github.com/maticnetwork/heimdall/blob/develop/bor/selection.go)

```go
// SelectNextProducers selects producers for the next span by converting power to slots
// spanEligibleVals - all validators eligible for next span
func SelectNextProducers(blkHash common.Hash, spanEligibleVals []hmTypes.Validator, producerCount uint64) (selectedIDs []uint64, err error) {
	if len(spanEligibleVals) <= int(producerCount) {
		for _, val := range spanEligibleVals {
			selectedIDs = append(selectedIDs, uint64(val.ID))
		}
		return
	}

	// extract seed from hash
	seed := helper.ToBytes32(blkHash.Bytes()[:32])
	validatorIndices := convertToSlots(spanEligibleVals)
	selectedIDs, err = ShuffleList(validatorIndices, seed)
	if err != nil {
		return
	}
	return selectedIDs[:producerCount], nil
}

// converts validator power to slots
func convertToSlots(vals []hmTypes.Validator) (validatorIndices []uint64) {
	for _, val := range vals {
		for val.VotingPower >= types.SlotCost {
			validatorIndices = append(validatorIndices, uint64(val.ID))
			val.VotingPower = val.VotingPower - types.SlotCost
		}
	}
	return validatorIndices
}
```

## प्रकार {#types}

यहाँ हेम्डल के उपयोग वाले स्पान विवरण दिए गए हैं:

```go
// Span structure
type Span struct {
	ID                uint64       `json:"span_id" yaml:"span_id"`
	StartBlock        uint64       `json:"start_block" yaml:"start_block"`
	EndBlock          uint64       `json:"end_block" yaml:"end_block"`
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}
```

## पैरामीटर {#parameters}

बोर मॉड्यूल में निम्नलिखित पैरामीटर होते हैं:

| की/कुंजी | प्रकार | डिफ़ॉल्ट वैल्यू |
|----------------------|------|------------------|
| स्प्रिंट अवधि | uint64 | 64 |
| स्पान अवधि | uint64 | 100 * स्प्रिंट अवधि |
| प्रोड्यूसर काउंट | uint64 | 4 |


## CLI कमांड्स {#cli-commands}

### स्पान प्रपोज tx {#span-propose-tx}

```bash
heimdallcli tx bor propose-span \
	--start-block <start-block> \
	--chain-id <heimdall-chain-id>
```

### क्वेरी वर्तमान स्पान {#query-current-span}

```bash
heimdallcli query bor span latest-span --chain-id <heimdall-chain-id>
```

अपेक्षित आउटपुट:

```go
{
  "span_id":2,
  "start_block":6656,
  "end_block":13055,
  "validator_set":{
    "validators":[
      {
        "ID":1,
        "startEpoch":0,
        "endEpoch":0,
        "power":1,
        "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
        "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
        "last_updated":"",
        "accum":0
      }
    ],
    "proposer":{
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  },
  "selected_producers":[
    {
      "ID":1,
      "startEpoch":0,
      "endEpoch":0,
      "power":1,
      "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
      "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
      "last_updated":"",
      "accum":0
    }
  ],
  "bor_chain_id":"15001"
}
```

### id द्वारा क्वेरी स्पान {#query-span-by-id}

```bash
heimdallcli query bor span --span-id <span-id> --chain-id <heimdall-chain-id>
```

यह परिणाम को उपरोक्त के समान फॉर्मेट में प्रिंट करता है.

### पैरामीटर {#parameters-1}

सभी params; को छापने के लिए

```go
heimdalldcli query bor params
```

अपेक्षित परिणाम:

```go
sprint_duration: 64
span_duration: 6400
producer_count: 4
```

## REST API {#rest-apis}

| नाम | तरीका | एंडपॉइंट |
|----------------------|------|------------------|
| स्पान विवरण | GET | /बोर/स्पान/<span-id\> |
| नवीनतम स्पान प्राप्त करें | GET | /बोर/नवीनतम-स्पान |
| परम पाएं | GET | /बोर/परम |
