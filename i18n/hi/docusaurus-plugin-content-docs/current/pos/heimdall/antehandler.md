---
id: antehandler
title: ऐंटी हैंडलर
description: Ante हैंडलर की जांच और transaction the को वैलिडेट करता है
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# ऐंटी हैंडलर {#ante-handler}

ऐंटी हैंडलर ट्रांज़ैक्शन को जाँचता और वैलिडेट करता है. वेरिफ़िकेशन के बाद, यह पर्याप्त फ़ीस के लिए भेजने वाले का बैलेंस जांचता है और ट्रांज़ैक्शन को सफतापूर्वक शामिल करने के मामले में फ़ीस काटता है.

## गैस की सीमा {#gas-limit}

गैस के इस्तेमाल के लिए हर एक ब्लॉक और ट्रांज़ैक्शन की एक सीमा होती है. एक ब्लॉक में कई block A हो सकते हैं, लेकिन ब्लॉक में सभी transactions द्वारा इस्तेमाल की जाने वाली गैस को बड़े ब्लॉक से बचने के लिए ब्लॉक गैस की सीमा से कम होना चाहिए.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

नोट करें कि ट्रांज़ैक्शन में हर एक स्टेट को कुशलतापूर्वल इस्तेमाल करने पर गैस खर्च होती है जिसमें ट्रांज़ैक्शन के लिए सिग्नेचर की वेरिफ़िकेशन शामिल है.

### ब्लॉक के गैस की सीमा {#block-gas-limit}

ब्लॉक के गैस की अधिकतम सीमा और प्रति ब्लॉक बाइट को ऐप की सहमति से जुड़े परम को सेट करते समय पास किया जाता है: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### ट्रांज़ैक्शन के गैस की सीमा {#transaction-gas-limit}

ट्रांज़ैक्शन के गैस की सीमा को `auth`मॉड्यूल में परम में परिभाषित किया जाता है. इसे हेम्डल `gov`मॉड्यूल के ज़रिए बदला जा सकता है.

### Transaction गैस सीमा {#checkpoint-transaction-gas-limit}

चूंकि ब्लॉक में कई ट्रांज़ैक्शन होते हैं और यह एथेरेयम चेन पर इस खास ट्रांज़ैक्शन को वेरिफ़ाई करता है, इसलिए मर्कल सबूत ज़रूरी है. अगर ट्रांज़ैक्शन का प्रकार `MsgCheckpoint`हो, तो चेकपॉइंट ट्रांज़ैक्शन के लिए अतिरिक्त मर्कल सबूत की वेरिफ़िकेशन से बचने के लिए, हेम्डल ब्लॉक में सिर्फ़ एक ट्रांज़ैक्शन की अनुमति देता है

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## ट्रांज़ैक्शन का वेरिफ़िकेशन और रिप्ले सुरक्षा {#transaction-verification-and-replay-protection}

ऐंटी हैंडलर आने वाले ट्रांज़ैक्शन में सिग्नेचर को संभालता और वेरिफ़ाई करता है: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

रिप्ले हमलों से बचने के लिए हर एक ट्रांज़ैक्शन में `sequenceNumber`होना चाहिए. हर एक ट्रांज़ैक्शन को सफलतापूर्वक शामिल करने के बाद, ऐंटी हैंडलर पिछले ट्रांज़ैक्शनों के दोहराव (रिप्ले) से बचने के लिए ट्रांज़ैक्शन (TX) भेजने वाले अकाउंट के लिए क्रम संख्या में इज़ाफा करता है.