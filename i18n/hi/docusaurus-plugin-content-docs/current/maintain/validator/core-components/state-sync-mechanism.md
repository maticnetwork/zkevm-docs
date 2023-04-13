---
id: state-sync-mechanism
title: स्टेट सिंक मैकेनिज्म
description: Ethereum डेटा को नेटिव रूप से पढ़ने के लिए स्टेट सिंक मैकेनिज्म
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[हेम्डल](/docs/maintain/glossary.md#heimdall) लेयर पर वैलिडेटर [स्टेटसिंक किए हुए](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) इवेंट को लेकर [बोर](/docs/maintain/glossary.md#bor) लेयर तक पहुँचा देते हैं. [पॉलीगॉन आर्किटेक्चर](/docs/pos/polygon-architecture) भी देखें.

**पाने वाले के अनुबंध**, में [आईस्टेटररिसीवर](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), और कस्टम लॉजिक जो [ऑनस्टेटरिसीव](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) फ़ंक्शन में मौजूद होते हैं, शामिल होते हैं.

नवीनतम संस्करण, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) में कुछ enhancements The शामिल हैं जैसे :
1. स्टेट सिंक txs में डेटा के आकार को इतने तक प्रतिबंधित करना:
    * **30 Kb** जब **बाइट** में प्रस्तुत किया जाता है
    * **60 Kb** जब **स्ट्रिंग** के रूप में प्रस्तुत किया जाता है.
2. यह सुनिश्चित करने के लिए विभिन्न वैलिडेटरों की अनुबंध घटनाओं के बीच **देरी का समय** बढ़ाने की घटनाओं के एकाएक प्रकट होने की स्थिति में मेमपूल बहुत जल्दी नहीं भरता जो चेन की प्रगति को बाधित कर सकता है.

निम्न उदाहरण से पता चलता है कि डेटा आकार कैसे प्रतिबंधित किया जाता है:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## यूज़र्स के लिए आवश्यकताएँ {#requirements-for-the-users}

स्टेट सिंक के साथ, डैप्स/यूज़र्स द्वारा करने के लिए ज़रूरी चीज़ें हैं:

1. [सिंकस्टेट](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) फ़ंक्शन को कॉल करें.
2. `syncState` फ़ंक्शन `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`नाम के इवेंट को उत्पन्न करता है
3. हेम्डल चेन पर सभी वैलिडेटरों को`StateSynced` इवेंट प्राप्त होता है. वैलिडेटर, स्टेट सिंक के लिए ट्रांज़ैक्शन फ़ीस प्राप्त करने के लिए, हेम्डल को ट्रांज़ैक्शन भेजता है.
4. हेम्डल पर `state-sync`ट्रांज़ैक्शन को एक ब्लॉक में शामिल कर दिए जाने के बाद, इसे लंबित स्टेट सिंक सूची में जोड़ दिया जाता है.
5. बोर पर हर स्प्रिंट के बाद, बोर नोड एक API कॉल के माध्यम से हेम्डल से लंबित स्टेट सिंक इवेंट प्राप्त करता है.
6. पाने वाले के अनुबंध में `IStateReceiver`इंटरफेस, और डेटा बाइट को डीकोड करने के और किसी भी काम को करने से जुड़े कस्टम लॉजिक जो कि ऑ[नस्टेजरिसीव ](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)फ़ंक्शन के भीतर मौजूद होते हैं, शामिल होते हैं.
