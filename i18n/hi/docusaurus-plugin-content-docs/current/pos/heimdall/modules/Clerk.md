---
id: clerk
title: क्लर्क
description: मॉड्यूल जो Ethereum से बोर में जेनेरिक स्टेट सिंक का प्रबंधन करता है
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# क्लर्क {#clerk}

क्लर्क एथेरेयम चेन से बोर चेन में जेनेरिक स्टेट-सिंक को मैनेज करता है. Heimdall स्टेट सिंक पर सहमत है, जो क्लार्क मॉड्यूल का इस्तेमाल करके Heimdall चेन पर शुरू किया जाता है.

[स्टेट सिंक मैकेनिज्म](/docs/pos/bor/core_concepts.md#state-management-state-sync) में अधिक विवरण उपलब्ध हैं

## मैसेज {#messages}

### MsgEventRecord {#msgeventrecord}

`StateSender.sol` से इवेंट्स को वैलिडेट करने और बोर द्वारा इस्तेमाल किए जाने वाले स्टेट को हेम्डल पर स्टोर करने की ज़िम्मेदारी `MsgEventRecord` ट्रांज़ैक्शन की है.

किसी भी दिए गए `msg.TxHash` और `msg.LogIndex` के लिए इस ट्रांज़ैक्शन का हैंडलर वैलिडेट करता है. अगर ट्रांज़ैक्शन को एक से ज़्यादा बार प्रक्रिया से गुजारने की कोशिश की जाती है, तो यह `Older invalid tx found` गड़बड़ी बताता है.

ट्रांज़ैक्शन मैसेज के लिए एक स्ट्रक्चर ये रहा:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## CLI कमांड्स {#cli-commands}

### स्टेट रिकॉर्ड ट्रांज़ैक्शन भेजें {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### पहले से वैलिडेट किए गए स्टेट इवेंट रिकॉर्ड की क्वेरी करने के लिए {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## REST API {#rest-apis}

| नाम | तरीका | एंडपॉइंट |
|----------------------|------|------------------|
| इवेंट रिकॉर्ड की पूरी जानकारी | पाएं | /clerk/event-record/<record-id\> |
| सभी इवेंट का रिकॉर्ड | पाएं | /clerk/event-record/list |
