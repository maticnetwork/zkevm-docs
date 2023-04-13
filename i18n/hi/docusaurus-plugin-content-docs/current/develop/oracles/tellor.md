---
title: Tellor
description: "अपने पॉलीगॉन कॉन्ट्रैक्ट में टेलर या दैवज्ञ को एकीकृत करने का एक गाइड"
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor एक Oracle है जो सेंसरशिप डेटा देता है जो सरल क्रिप्टो इकोनॉमिक प्रोत्साहन से सुरक्षित किया गया है. डेटा किसी के द्वारा भी दिया जा सकता है और सभी के द्वारा जाँचा जा सकता है. Tellor का बहुत आसान ढाँचा किसी भी समय के अंतराल में सरल प्रयोग/इनोवेशन करने के लिए कोई भी डेटा दे सकता है.

## (Soft) जो पहले चाहिए {#soft-prerequisites}

हम ऑरेकल संबंधित चीजों पर ध्यान लगाने के लिए आपकी कोडिंग स्किल के स्तर के बारे में निम्नलिखित मान रहे हैं.

जो माना गया है:

- आप किसी टर्मिनल को नैविगेट कर सकते हैं
- आपके पास इंस्टॉल किया हुआ npm है
- आपको आधारित चीज़ों के लिए npm का इस्तेमाल करना आता है

Tellor एक लाइव और ओपन सोर्स ऐप्लिकेशन है जो लागू करने के लिए तैयार है. यह शुरुआती गाइड यहां उस आसानी को दिखाने के लिए है जिसके साथ कोई भी टेलर के साथ उठ और चल सकता है, जो पूरी तरह से विकेंद्रीकृत और सेंसरशिप प्रतिरोधी ऑरेकल के साथ आपकी परियोजना प्रदान करता है.

## ओवरव्यू {#overview}

Tellor एक ऑरेकल सिस्टम है जहाँ पार्टियाँ किसी ऑफ़-चेन डेटा पॉइंट (उदाहरण BTC/USD) की वैल्यू का अनुरोध कर सकती हैं और रिपोर्टर सभी पॉलीगॉन स्मार्ट कॉन्ट्रैक्ट द्वारा ऐक्सेस हो सकने वाले ऑन-चेन डेटा बैंक में यह वैल्यू जोड़ने के लिए प्रतिस्पर्धा करते हैं. इस डेटा-बैंक के इनपुट स्टेक किए हुए रिपोर्टरों के एक नेटवर्क द्वारा सुरक्षित किए गए हैं. Tellor क्रिप्टो-इकोनॉमिक इंसेंटिव मैकेनिज़्म का इस्तेमाल करता है. रिपोर्टरों द्वारा ईमानदारी से डेटा के सब्मिशन को Tellor टोकन के जारी करने के द्वारा पुरस्कृत किया जाता है. किसी भी गलत करने वाले को तुरंत दंडित किया जाता है और विवाद मैकेनिज़्म द्वारा नेटवर्क से हटा दिया जाता है.

इस ट्यूटोरियल में हम यह कुछ देखेंगे:

- शुरुआती टूल किट सेट करना जो शुरू करने और काम करते रहने में मदद करेगी.
- एक आसान उदाहरण देखें.
- यह उन टेस्टनेट पतों की सूची देता है जिस पर वर्तमान में आप Tellor को टेस्ट कर सकते हैं.

## Tellor का इस्तेमाल करना {#usingtellor}

आप पहली चीज़ यह करना चाहेंगे कि अपने ऑरेकल के रूप में Tellor का उपयोग करने के लिए ज़रूरी बुनियादी टूल इंस्टॉल करें. Tellor के यूज़र कॉन्ट्रैक्ट को इंस्टॉल करने के लिए [इस पैकेज](https://github.com/tellor-io/usingtellor) का इस्तेमाल करें:

`npm install usingtellor`

एक बार इंस्टॉल होने पर यह आपके अनुबंधों को 'Tellor का इस्तेमाल करना' अनुबंध से फ़ंक्शन ग्रहण करने देगा.

बढ़िया! अब जब आपने टूल तैयार कर लिए हैं, तो हम एक आसान काम करते हैं जहाँ हम बिटकॉइन की कीमत निकालते हैं:

### BTC/USD उदाहरण {#btc-usd-example}

Tellor पते को एक कंस्ट्रक्टर आर्गुमेंट के रूप में पास करने से Tellor का इस्तेमाल करना अनुबंध को ग्रहण करें:

एक उदाहरण यह रहा:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## पते: {#addresses}

Tellor ट्रिब्यूट्स: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

ऑरेकल: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### पहले कुछ टेस्टिंग करना चाहते हैं?: {#looking-to-do-some-testing-first}

पॉलीगॉन Mumbai टेस्टनेट: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

टेस्ट ट्रिब्यूट्स:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

कुछ टेस्ट टोकन की जरूरत है. Tweet हमें ['@trbfaucet'](https://twitter.com/trbfaucet)

इस्तेमाल की आसानी के लिए, UsingTellor रेपो आसान इंटीग्रेशन के लिए [Tellor Playground कॉन्ट्रैक्ट](https://github.com/tellor-io/TellorPlayground) के एक संस्करण के साथ आता है. सहायक कार्यों की सूची के लिए [यहाँ](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) देखें.

#### Tellor Oracle को अधिक स्थिर लागू करने  के लिए, [यहाँ](https://github.com/tellor-io/usingtellor/blob/master/README.md) उपलब्ध फ़ंक्शन की पूरी सूची जाँचें

#### अभी भी सवाल हैं. [यहाँ](https://discord.gg/tellor) के समुदाय में शामिल हों.
