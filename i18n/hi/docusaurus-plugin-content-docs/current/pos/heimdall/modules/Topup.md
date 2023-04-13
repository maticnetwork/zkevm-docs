---
id: topup
title: टॉपअप
description: एक रकम जिसका इस्तेमाल Heimdall चेन पर फीस का भुगतान करने के लिए किया जाएगा
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# टॉपअप {#topup}

हेम्डल टॉपअप एक ऐसी रकम है जिसका इस्तेमाल हेम्डल चेन पर फीस का भुगतान करने के लिए किया जाएगा.

अपने अकाउंट को टॉप करने के दो तरीके हैं:

1. जब नए वैलिडेटर जोन्स करते हैं, तो वे स्टेक्ड रकम के अलावा एक `topup`रकम का जिक्र कर सकते हैं, जिसे Heimdall. पर फीस का भुगतान करने के लिए Heimdall चेन पर बैलेंस के रूप में ले जाया जाएगा.
2. एक यूजर Heimdall. पर टॉप-अप बैलेंस बढ़ाने के लिए smart पर होने वाले स्मार्ट कॉन्ट्रैक्ट पर सीधे टॉप-अप फंक्शन को कॉल कर सकता है.

## मैसेज {#messages}

### मैसेज टॉपअप {#msgtopup}

`MsgTopup`ट्रांज़ैक्शन, स्टेकिंग मैनेजर कॉन्ट्रैक्ट पर एथेरेयम चेन के `TopUpEvent` के आधार पर हेम्डल पर एक पते पर बैलेंस को मिंट करने के लिए जिम्मेदार होता है.

इस ट्रांज़ैक्शन के लिए हैंडलर, टॉप-अप को प्रोसेस करता है और किसी भी दिए गए `msg.TxHash`और  `msg.LogIndex` के लिए केवल एक बार बैलेंस को बढ़ाता है. टॉप-अप को एक से अधिक बार प्रोसेस करने की कोशिश करने पर यह `Older invalid tx found`त्रुटि देता है.

टॉप-अप ट्रांज़ैक्शन मैसेज का स्ट्रक्चर ये रहा:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### मैसेज निकासी फ़ीस {#msgwithdrawfee}

`MsgWithdrawFee`ट्रांज़ैक्शन हेम्डल से एथेरेयम चेन तक बैलेंस को निकालने के लिए जिम्मेदार होता है. एक वैलिडेटर हेम्डल से कोई भी रकम निकाल सकता है.

हैंडलर दिए गए वैलिडेटर से बैलेंस काटकर निकासी को प्रोसेस करता है और स्टेट को अगले चेकपॉइंट में भेजने के लिए तैयार करता है. अगले संभावित चेकपॉइंट में विशिष्ट वैलिडेटर के लिए निकासी सम्बन्धी स्टेट शामिल होगा.

हैंडलर `ValidatorAddress` के आधार पर वैलिडेटर जानकारी प्राप्त करता है और निकासी को प्रोसेस करता है.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## CLI कमांड्स {#cli-commands}

### टॉपअप फ़ीस {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### निकासी फ़ीस {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

अकाउंट पर प्रदर्शित टॉपअप जाँचने के लिए निम्नलिखित कमांड रन करें

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## REST API {#rest-apis}

| नाम | तरीका | URL | बॉडी परम |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| टॉपअप फ़ीस | पोस्ट | /टॉपअप/फ़ीस | `id`वैलिडेटर आईडी, `tx_hash`एथेरेयम चेन पर सफल टॉपअप इवेंट का ट्रांज़ैक्शन हैश, `log_index` एथेरेयम चेन पर उत्सर्जित टॉपअप इवेंट का इंडेक्स चेन |
| निकासी फ़ीस | पोस्ट | /टॉपअप/निकासी | `amount`निकासी रकम |
