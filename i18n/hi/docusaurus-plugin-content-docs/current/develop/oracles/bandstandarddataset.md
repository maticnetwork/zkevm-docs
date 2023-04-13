---
id: bandstandarddataset
title: बैंड स्टैंडर्ड डेटासेट
sidebar_label: Standard Dataset
description: बैंड Stardard डाटासेट 196+ से अधिक प्रतीकों के लिए रेल्वे की कीमत की जानकारी प्रदान करता है, जो क्रिप्टो संपत्ति, विदेशी एक्सचेंज और जिंसों में फैले हैं.
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

पॉलीगॉन पर निर्माण करने वाले अब बैंड प्रोटोकॉल के विकेंद्रीकृत दैनिकी अवसंरचना का लाभ उठा सकते हैं. बैंड प्रोटोकॉल के दैनिकी के साथ, उनके एप्लिकेशन में एकीकृत करने के लिए अब उनके पास विभिन्न क्रिप्टो की कीमत डेटा तक पहुंच है.

## सपोर्ट किए गए टोकन {#supported-tokens}

मौजूदा समय में, सपोर्ट किए गए सिंबल की सूची [data.bandprotocol.com](http://data.bandprotcool.com) पर देखी जा सकती है. आगे चलकर, ये सूची डेवलपर की ज़रूरतों और कम्युनिटी के फ़ीडबैक के आधार पर बढ़ती रहेगी.

## कीमत पेयर {#price-pairs}

नीचे दिए गए तरीके आधार/क्वोट टोकन पेयर के किसी भी संयोजन के साथ काम कर सकते हैं, जब तक कि आधार और क्वोट के सिंबल को डेटासेट द्वारा सपोर्ट किया जाता है.

### क्वेरी की कीमत {#querying-prices}

वर्तमान में, बैंड प्रोटोकॉल के दैवज्ञ से कीमतों को क्वेरी करने के लिए दो तरीके हैं:  पॉलीगॉन पर बैंड के `StdReference`स्मार्ट कॉन्ट्रैक्ट के माध्यम से, और उनके [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)जावास्क्रिप्ट सहायक लाइब्रेरी के माध्यम से.

### सॉलिडिटी स्मार्ट कॉन्ट्रैक्ट {#solidity-smart-contract}

बैंड प्रोटोकॉल के दैवज्ञ से कीमतों को क्वेरी करने के लिए, एक स्मार्ट कॉन्ट्रैक्ट को बैंड के कॉन्ट्रैक्ट का संदर्भ देना `StdReference`चाहिए, विशेष रूप से `getReferenceData`और `getReferenceDatabulk`तरीके

`getReferenceData`इनपुट, `base`और `quote`प्रतीक के रूप में दो स्ट्रिंग लेता है. यह तब उन दो टोकन के लिए नवीनतम दरों के लिए `StdReference` कॉन्ट्रैक्ट को क्वेरी करता है, और नीचे दिखाए गए `ReferenceData` स्ट्रक्चर को वापस करता है.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

इसके बजाय `getReferenceDataBulk` दो सूचियाँ लेता है, एक `base` के टोकन की, और एक `quotes` की. इसके बाद यह हर इंडेक्स में बेस/उद्धरण जोड़ी के लिए कीमत को इसी तरह क्वेरी में आगे बढ़ता है और structs. की एक सारणी वापस आती `ReferenceData`है.

उदाहरण के लिए, अगर हम `getReferenceDataBulk` को `['BTC','BTC','ETH']` और `['USD','ETH','BNB']` के साथ कॉल करते हैं, तो लौटाए गए `ReferenceData` ऐरे में पेयर के बारे में जानकारी होगी:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## कॉन्ट्रैक्ट पते {#contract-addresses}

| ब्लॉकचेन | कॉन्ट्रैक्ट पते |
| -------------------- | :------------------------------------------: |
| पॉलीगॉन (टेस्ट) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

बैंड का नोड हेल्पर लाइब्रेरी [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) भी इसी तरह के `getReferenceData`फ़ंक्शन  को सपोर्ट करता है. यह फंक्शन एक आर्गुमेंट लेता है, परिणाम की पूछताछ के लिए टोकन युग्मन की एक सूची इसके बाद यह संबंधित रेट वैल्यू की एक सूची लौटाता है.


### उदाहरण के लिए उपयोग {#example-usage}

नीचे दी गई कोड फंक्शन का एक उदाहरण यूज दिखाता है:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

इसके बाद संबंधित परिणाम इस प्रकार के होंगे:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

हर एक पेयर के लिए, जानकारी को लौटाया जाएगा:

- `pair`: आधार/क्वोट सिंबल पेयर स्ट्रिंग
- `rate`: दिए गए पेयर की परिणामी दर
- `updated`: वो टाइमस्टैम्प जिस पर आधार/क्वोट सिंबलों को आखिरी बार BandChain पर अपडेट किया गया था. क्योंकि `USD`यह वर्तमान समय की मुहर होगी.
- `rawRate`: इस ऑब्जेक्ट के दो भाग होते हैं.
  - `value` वास्तविक दर की `BigInt` वैल्यू है, जो `10^decimals` से गुणा की जाती है
  - `decimals` तो वह एक्सपोनेंट्स है जिसके द्वारा `rate` को `rawRate` पाने के लिए गुणा किया गया था

## उदाहरण के लिए उपयोग {#example-usage-1}

यह [कॉन्ट्रैक्ट](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) बैंड के `StdReference` कॉन्ट्रैक्ट और `getReferenceData` फ़ंक्शन का इस्तेमाल करने का एक उदाहरण दिखाता है.