---
id: governance
title: गवर्नेंस
sidebar_label: Governance
description: 1 टोकन - 1 वोट के आधार के साथ सिस्टम
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# गवर्नेंस {#governance}

हेम्डल गवर्नेंस [`x/gov`Cosmos-sdk मॉड्यूल](https://docs.cosmos.network/master/modules/gov/) के रूप में ठीक उसी तरह काम करता है.

इस सिस्टम में, चेन के नेटिव स्टेकिंग टोकन धारक एक `1 token = 1 vote`आधार पर प्रपोजल्स पर वोट कर सकते हैं. यहाँ मॉड्यूल की एक सूची है जो वर्तमान में समर्थन करती है:

- **प्रपोजल सबमिशन:** वैलिडेटर्स एक डिपाज़िट के साथ प्रपोजल्स सबमिट कर सकते हैं. मिनिमम डिपाज़िट तक पहुंचे के बाद, प्रपोजल वोटिंग अवधि में प्रवेश करता है. प्रपोजल्स पर डिपाज़िट किए गए वैलिडेटर्स, प्रपोजल के अस्वीकृत या स्वीकृत होने के बाद, अपने डिपाज़िट को रिकवर कर सकते हैं.
- **वोट:** वैलिडेटर MinDeposit. तक पहुंचने वाले प्रस्तावों पर वोट कर सकते हैं.

`gov`मॉड्यूल में पैरामीटर के रूप में डिपाज़िट अवधि और वोटिंग अवधि होती है. जमा अवधि समाप्त होने से पहले न्यूनतम जमा करना होता है, अन्यथा प्रस्ताव को स्वतः अस्वीकार कर दिया जाएगा.

डिपाज़िट अवधि के भीतर मिनिमम डिपाज़िट के पहुँचने पर, वोटिंग अवधि शुरू हो जाती है. वोटिंग अवधि में, सभी वैलिडेटर्स को अपनी पसंद के प्रपोजल को वोट देना चाहिए. वोटिंग अवधि समाप्त होने पर, `gov/Endblocker.go`, `tally`  फंक्शन को एग्जीक्यूट करता है और `tally_params` — `quorum`, `threshold` और `veto` के आधार पर प्रपोजल को स्वीकार या अस्वीकार करता है.

स्रोत: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

विभिन्न प्रकार के प्रस्ताव हैं जिन्हें Heimdall. में लागू किया जा सकता है. अब तक, यह केवल **परम परिवर्तन के** प्रस्ताव का समर्थन करता है.

### परम परिवर्तन प्रपोजल {#param-change-proposal}

इस प्रकार के प्रस्ताव का इस्तेमाल करके, वैलिडेटर Heimdall. में `module`से किसी भी `params`में बदल सकते हैं.

उदाहरण: `auth`मॉड्यूल में ट्रांज़ैक्शन के लिए कम से कम `tx_fees` बदलें. प्रपोजल स्वीकृत हो जाने पर, यह `params`को स्वतः हेम्डल स्टेट में बदल देता है. किसी अतिरिक्त TX की जरूरत नहीं पड़ती है.

## CLI कमांड्स {#cli-commands}

### क्वेरी गवर्नेंस परम {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

यह गवर्नेंस मॉड्यूल के लिए सभी पैरामीटर को दर्शाता है.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### प्रपोजल सबमिट करें {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json`एक फाइल है जिसमें json फॉर्मेट में प्रपोजल शामिल होता है.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### क्वेरी प्रपोजल {#query-proposal}

सभी प्रस्तावों से पूछताछ करने के लिए:

```go
heimdallcli query gov proposals --trust-node
```

एक विशेष प्रस्ताव से पूछताछ करने के लिए:

```go
heimdallcli query gov proposals 1 --trust-node
```

### प्रपोजल पर वोट करें {#vote-on-proposal}

एक विशेष प्रस्ताव पर वोट देना :

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

वोटिंग अवधि के बाद प्रपोजल को स्वतः टैली किया जाएगा.

## REST API {#rest-apis}

| नाम | तरीका | एंडपॉइंट |
|----------------------|------|------------------|
| सभी प्रपोजल पाएं | पाएं | /गवर्नेंस/प्रपोजल |
| प्रपोजल विवरण पाएं | पाएं | /गवर्नेंस/प्रपोजल्स/`proposal-id` |
| प्रपोजल के लिए सभी वोट पाएं | पाएं | /गवर्नेंस/प्रपोजल्स/`proposal-id`/वोट्स |
