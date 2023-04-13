---
id: bandchain
title: बैंड चेन
sidebar_label: BandChain
description: बैंड चेन पारंपरिक वेब API से डेटा क्वेरी करने के लिए डेटा ओरेकल के लिए एक उच्च-प्रदर्शन ब्लॉकचेन है
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

बैंड प्रोटोकॉल से आप पारंपरिक वेब API से डेटा क्वेरी कर स्टे हैं और इसे ब्लॉकचेन में इस्तेमाल कर सकते हैं. डेवलपर दैवज्ञ अनुरोध और भुगतान की सुविधा के लिए **एक cosmos-based आधारित ब्लॉकचेन के** माध्यम से पूछताछ कर सकते हैं और फिर इंटर-चेन कम्युनिकेशन के माध्यम से dApp पर डेटा का इस्तेमाल करते हैं. ऑरेकल डेटा को 3 आसान स्टेप में एकीकृत किया जा सकता है:

1. **ऑरेकल स्क्रिप्ट चुनना**

ओरेकल स्क्रिप्ट एक हैश है जो ख़ास तौर से बैंड-चेन से अनुरोध किए जाने वाले डेटा के प्रकार का पता लगाता है. ये स्क्रिप्ट [**यहाँ**](https://guanyu-devnet.cosmoscan.io/oracle-scripts) मिल सकती हैं. इन स्क्रिप्ट का इस्तेमाल ऑरेकल अनुरोध करते समय एक पैरामीटर के रूप में किया जाता है.

2. **BandChain से डेटा का अनुरोध करना**

यह दो तरीके से किया जा सकता है:

    - **बैंडचेन एक्सप्लोरर का इस्तेमाल कर**

    आप अपनी पसंद की दैवज्ञ स्क्रिप्ट पर क्लिक कर सकते हैं और फिर **एक्जीक्यूट** टैब से आप पैरामीटर्स में पास हो सकते हैं और बैंडचेन से रिस्पांस प्राप्त कर सकते हैं. प्रतिक्रिया में परिणाम और EVM (एथेरेयम वर्चुअल मशीन) सबूत भी शामिल होंगे. इस सबूत को कॉपी करना होगा और आखिरी स्टेप में इसका इस्तेमाल किया जाएगा. एक्सप्लोरर का इस्तेमाल करके दैवज्ञ को पूछताछ के लिए बैंडचेन डॉस [**यहां**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer) उपलब्ध है.

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    उपरोक्त को देखते हुए यादृच्छिक संख्या के मान प्राप्त करने के लिए एक दैवज्ञ अनुरोध बनाने का एक उदाहरण है. 100 का मान दैवज्ञ अनुरोध के `max_range`पैरामीटर में पास हो जाता है. हमें प्रतिक्रिया में एक हैश मिलता है. इस हैश पर क्लिक करने से हमें प्रतिक्रिया का पूरा विवरण दिखाई देगा.

    - **BandChain-Devnet JS लाइब्रेरी का इस्तेमाल कर**

    आप BandChain लाइब्रेरी का इस्तेमाल करके सीधे बैंडचेन से पूछताछ कर सकते हैं. क्वेरी होनें पर, यह प्रतिक्रिया में **evm सबूत** देता है. इस सबूत का इस्तेमाल BandChain एकीकरण के आखिरी स्टेप के लिए किया जा सकता है. BandChain JS लाइब्रेरी का इस्तेमाल करके दैवज्ञ को पूछताछ के लिए बैंडचेन डोक [**यहां**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) उपलब्ध है. रैंडम नंबर ऑरेकल के लिए अनुरोध पेलोड कुछ इस तरह का दिखाई देगा. सुनिश्चित करें कि अनुरोध का मुख्य भाग application/json फ़ॉर्मेट में पास किया गया है.

3. **स्मार्ट कॉन्ट्रैक्ट में डेटा का इस्तेमाल करना**

अंतिम स्टेप में एक सत्यापन कॉन्ट्रैक्ट को डिप्लॉय किया जाता है और ऑरेकल अनुरोध से प्रतिक्रियाओं को सत्यापन कॉन्ट्रैक्ट स्टेट वेरिएबल में स्टोर किया जाता है. एक बार जब ये स्टेट वेरिएबल सेट हो जाते हैं, तो उन्हें dApp द्वारा ज़रूरत होने पर एक्सेस किया जा सकता है. साथ ही इन स्टेट वेरिएबल को dApp से फिर से ऑरेकल स्क्रिप्ट को क्वेरी करके नई वैल्यू के साथ अपडेट किया जा सकता है. नीचे दिया गया एक सत्यापन कॉन्ट्रैक्ट है जो रैंडम नंबर ऑरेकल स्क्रिप्ट का इस्तेमाल करके रैंडम नंबर वैल्यू को स्टोर करता है.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

जब तैनाती हो जाती है, तो 3 पैरामीटर को पास होना पड़ता है. **पहला पैरामीटर** वह है `codeHash`जो कि दैवज्ञ स्क्रिप्ट हैश है. **दूसरा पैरामीटर** है, जो दैवज्ञ स्क्रिप्ट अनुरोध पैरामीटर ऑब्जेक्ट है. इसे बाइट्स प्रारूप में पास किया जाना है. BandChain पैरामीटर JSON ऑब्जेक्ट को बाइट फ़ॉर्मेट में बदलने के लिए REST API देता है. API विवरण [**यहाँ**](https://docs.bandchain.org/references/encoding-params) मिल सकता है. इस API से मिली प्रतिक्रिया के लिए एक 0x जोड़ा जाना है. **तीसरा पैरामीटर** बैंडचेन कॉन्ट्रैक्ट का कॉन्ट्रैक्ट पता है जो पहले से ही पॉलीगॉन नेटवर्क पर तैनात है. बैंड प्रोटोकॉल पॉलीगॉन टेस्टनेट V3 को सपोर्ट करता है: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

ध्यान देने की एक और बात यह है कि वैलिडेशन कॉन्ट्रैक्ट को हेल्पर लाइब्रेरी और इंटरफेस को इम्पोर्ट करना चाहिए जिसे क्रमशः `BandChainLib.sol`और बुलाया जाता `IBridge.sol`है. उन्हें निम्नलिखित लिंक में पाया जा सकता है: [**बैंडचेन**](https://docs.bandchain.org/references/bandchainlib-library) लाइब्रेरी और [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) इंटरफ़ेस

एक बार सत्यापन कॉन्ट्रैक्ट डिप्लॉय हो जाने के बाद, स्टेट वेरिएबल को dApp से क्वेरी करके एक्सेस किया जा सकता है. इसी प्रकार in-built दैवज्ञ स्क्रिप्ट के लिए कई वैलिडेशन कॉन्ट्रैक्ट बनाए जा सकते हैं. IBridge इंटरफेस का एक तरीका है `relayAndVerify()`जिसे called कॉन्ट्रैक्ट में हर बार अपडेट किए जा रहे मूल्यों को सत्यापित करता है. validation कॉन्ट्रैक्ट में की गई `update()`विधि में स्टेट वेरिएबल को अपडेट करने के लिए लॉजिक है. दर्शनशास्त्र की स्क्रिप्ट को पूछताछ से प्राप्त ईवीएम प्रूफ को विधि में पास करना पड़ता `update()`है. हर बार एक वैल्यू को अपडेट किया जाता है, पॉलीगॉन पर तैनात बैंडचेन कॉन्ट्रैक्ट कॉन्ट्रैक्ट स्टेट वेरिएबल में इसे स्टोर करने से पहले डेटा को सत्यापित करता है.

बैंड चेन उन बाधाओं का विकेंद्रीकृत नेटवर्क प्रदान करता है जिसका इस्तेमाल अपने स्मार्ट कॉन्ट्रैक्ट लॉजिक को बढ़ावा देने के लिए dApp द्वारा किया जा सकता है. कॉन्ट्रैक्ट को डिप्लॉय करने पर बैंड चेन डॉस करता है और उन्हें अपडेट करता है [**यहाँ**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library) पाया जा सकता है.