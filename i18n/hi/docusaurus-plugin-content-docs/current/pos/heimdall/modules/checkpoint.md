---
id: checkpoint
title: चेकपॉइंट
description: मॉड्यूल जो चेकपॉइंट से संबंधित कार्यकलापों का प्रबंधन करता है
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# चेकपॉइंट {#checkpoint}

`checkpoint`मॉड्यूल, हेम्डल के लिए चेकपॉइंट सम्बन्धी कार्यों को मैनेज करता है. इसे बोर चेन की जरूरत पड़ती है जब चेकपॉइंट रूट हैश को वेरिफाई करने के लिए हेम्डल पर एक नया चेकपॉइंट प्रस्तावित किया जाता है.

चेकपॉइंट डेटा से संबंधित सभी को [यहाँ](/docs/pos/heimdall/checkpoint) के विवरण में समझाया गया है.

## चेकपॉइंट का जीवनचक्र {#checkpoint-life-cycle}

हेम्डल अगले प्रस्ताव को चुनने के लिए टेंडरमिंट के रूप में उसी लीडर चयन एल्गोरिदम का इस्तेमाल करता है. एथेरेयम चेन पर चेकपॉइंट सबमिट करते समय, यह गैस सीमा, एथेरेयम पर ट्रैफिक और अधिक गैस फ़ीस जैसे की कई कारणों के वजह से विफल हो सकता है. इसीलिए कई स्टेज वाली चेकपॉइंट प्रक्रिया की जरूरत पड़ती है.

हर चेकपॉइंट में प्रस्ताव के रूप में वैलिडेटर होता है. अगर Ethereum चेन पर चेकपॉइंट विफल या सफल हो जाता है, `ack`और transaction `no-ack`transaction अगले चेकपॉइंट के लिए Heimdall पर प्रस्ताव को बदल देता है. निम्नलिखित फ्लो चार्ट चेकपॉइंट के जीवन चक्र को प्रतिनिधित्व करता है:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## मैसेज {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### मैसेज चेकपॉइंट {#msgcheckpoint}

`MsgCheckpoint`हेम्डल पर चेकपॉइंट सत्यापन को हैंडल करता है. केवल यह संदेश RLP एनकोडिंग का इस्तेमाल करता है क्योंकि इसे Ethereum चेन पर सत्यापित करने की जरूरत है.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

हेम्डल पर इस ट्रांज़ैक्शन के प्रोसेस होने के बाद, `proposer` इस ट्रांज़ैक्शन के लिए टेंडरमिंट से `votes`और `sigs`लेता है और एथेरेयम चेन पर चेकपॉइंट भेजता है.

चूंकि ब्लॉक में कई ट्रांज़ैक्शन होते हैं और यह एथेरेयम चेन पर इस खास ट्रांज़ैक्शन को वेरिफ़ाई करता है, इसलिए मर्कल सबूत ज़रूरी है. एथेरेयम पर अतिरिक्त मर्कल सबूत सत्यापन से बचने के लिए, हेम्डल, ट्रांज़ैक्शन प्रकार `MsgCheckpoint`होने पर ब्लॉक में केवल एक ट्रांज़ैक्शन की अनुमति देता है

मैकेनिज्म को अनुमति देने के लिए, हेम्डल, `MsgCheckpoint` ट्रांज़ैक्शन को अधिक गैस उपभोग वाले ट्रांज़ैक्शन के रूप में सेट करता है. जाँचें [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

यह ट्रांज़ैक्शन, प्रस्तावित चेकपॉइंट को वास्तविक चेकपॉइंट लिस्ट स्टेट के बजाय `checkpointBuffer`स्टेट पर स्टोर करेगा.

### मैसेज चेकपॉइंट एक्नोलेजमेंट {#msgcheckpointack}

`MsgCheckpointAck`सफल चेकपॉइंट सबमिशन को हैंडल करता है. यहाँ एक चेकपॉइंट काउंटर `HeaderBlock`है;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

सबमिट किए गए चेकपॉइंट के लिए वैलिड `TxHash` और `LogIndex` के लिए, यह ट्रांज़ैक्शन, निम्नलिखित इवेंट को वेरिफाई करता है और चेकपॉइंट को `checkpointBuffer`स्टेट में वैलिडेट करता है: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

सफल इवेंट सत्यापन पर, यह चेकपॉइंट की वास्तविक गिनती को अपडेट करता है, जिसे जिसे भी कहा जाता है `ackCount`और उसे साफ करता है.`checkpointBuffer`

### मैसेज चेकपॉइंट नो एक्नोलेजमेंट {#msgcheckpointnoack}

`MsgCheckpointNoAck`असफल चेकपॉइंट या ऑफलाइन प्रपोजर्स को हैंडल करता है. यह ट्रांज़ैक्शन निम्नलिखित इवेंट्स से `CheckpointBufferTime` के पास होने के बाद ही वैलिड होता है:

- अंतिम सफल `ack`ट्रांज़ैक्शन
- अंतिम सफल `no-ack`ट्रांज़ैक्शन

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

यह ट्रांज़ैक्शन हेम्डल द्वारा अगले चेकपॉइंट के लिए एक नया `proposer` चुने जाने से पहले, वर्तमान प्रपोजर को चेकपॉइंट/एक्नोलेजमेंट भेजने का समय देता है.

## पैरामीटर {#parameters}

चेकपॉइंट मॉड्यूल में निम्नलिखित पैरामीटर होते हैं:

| की/कुंजी | प्रकार | डिफ़ॉल्ट वैल्यू |
|----------------------|------|------------------|
| चेकपॉइंट बफर टाइम | uint64 | 1000 * टाइम.सेकंड |


## CLI कमांड्स {#cli-commands}

### परम {#params}

सभी params: को छापने के लिए:

```go
heimdallcli query checkpoint params --trust-node
```

अपेक्षित परिणाम:

```yaml
checkpoint_buffer_time: 16m40s
```

### चेकपॉइंट भेजें {#send-checkpoint}

निम्नलिखित कमांड हेम्डल पर चेकपॉइंट ट्रांज़ैक्शन भेजता है:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### भेजें`ack`

निम्नलिखित कमांड हेम्डल पर एक्नोल्जेमेंट ट्रांज़ैक्शन भेजता है यदि एथेरेयम पर चेकपॉइंट सफल होता है:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### भेजें`no-ack`

निम्नलिखित कमांड हेम्डल पर नो-एक्नोलेजमेंट ट्रांज़ैक्शन भेजता है:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API {#rest-apis}

| नाम | तरीका | एंडपॉइंट |
|----------------------|------|------------------|
| वर्तमान चेकपॉइंट बफर स्टेट पाएं | पाएं | /चेकपॉइंट/बफर |
| चेकपॉइंट काउंट पाएं | पाएं | /चेकपॉइंट/काउंट |
| ब्लॉक इंडेक्स द्वारा चेकपॉइंट विवरण पाएं | पाएं | /चेकपॉइंट/हेडर्स<header-block-index\> |
| नवीनतम चेकपॉइंट पाएं | पाएं | /चेकपॉइंट/नवीनतम-चेकपॉइंट |
| अंतिम नो-एक्नोलेजमेंट विवरण पाएं | पाएं | /चेकपॉइंट/अंतिम-नो-एक्नोलेजमेंट |
| दिए गए प्रारंभिक और अंतिम ब्लॉक के लिए चेकपॉइंट विवरण | पाएं | /चेकपॉइंट/ <start\>/<end\> |
| नंबर के आधार पर चेकपॉइंट | पाएं | /चेकपॉइंट<checkpoint-number\>/ |
| सभी चेकपॉइंट | पाएं | /चेकपॉइंट/लिस्ट |
| एक्नोलेजमेंट काउंट, बफर, वैलिडेटर सेट, वैलिडेटर काउंट और आखिरी नो-एक्नोलेजमेंट विवरण पाएं | पाएं | /ओवरव्यू |


सभी क्वेरी API निम्नलिखित प्रारूप में परिणाम प्रदान करेगा:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
