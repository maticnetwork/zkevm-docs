---
id: submit-mapping-request
title: मैपिंग टोकन
description:  PoS ब्रिज का इस्तेमाल करके Ethereum और पॉलीगॉन चेन के बीच के टोकन को कैसे मैप करें
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

मैपिंग की जरूरत है कि अपनी परिसंपत्तियों को Ethereum और पॉलीगॉन PoS से और transfer र करने के लिए जरूरी है. हम ऐसा करने के लिए दो ब्रिज देते हैं. पुल के बारे में अधिक विवरण [यहाँ](/develop/ethereum-polygon/getting-started.md) समझा जा सकता है.

:::tip

पॉलीगॉन PoS ब्रिज पॉलीगॉन मैननेट और मुंबई टेस्टनेट दोनों के लिए उपलब्ध है.

:::

## मैपिंग अनुरोध सबमिट करने के स्टेप {#steps-to-submit-a-mapping-request}

Ethereum और पॉलीगॉन PoS के बीच टोकनों को मैप करने के लिए, आप [पॉलीगॉन टोकन मैपर](https://mapper.polygon.technology/) का इस्तेमाल कर सकते हैं. लिंक खोलें और नए मैपिंग अनुरोध को शुरू करने के लिए शीर्ष दाहिने कोने पर **मैप न्यू टोकन** बटन पर क्लिक करें.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**स्टेप 1 →** उस नेटवर्क को चुनें जिस पर आप अपने टोकन को मैप करना चाहते हैं. आप टेस्टनेट के लिए **Goerli-Mumbai** को चुन सकते हैं, और मैननेट के लिए **एट्रियम पॉलीगॉन PoS** को

**स्टेप 2**  टोकन के प्रकार को चुनें - **ERC20**, **ERC721** या **ERC155 **.

**स्टेप 3**  **Ethereum/Goerli टोकन पता** क्षेत्र में अपने **Ethereum/Goerli** टोकन का पता दर्ज करें सुनिश्चित करें कि आपका टोकन कॉन्ट्रैक्ट कोड **Ethereum/Goerli** ब्लॉकचेन एक्सप्लोरर पर सत्यापित हो गया है.

**स्टेप 4 →** **Ethereum टोकन पता** जोड़ने के बाद, संबंधित क्षेत्रों जैसे **टोकन नेम, टोकन सिंबल और टोकन डेसिमल** को कॉन्ट्रैक्ट डिसिमल के साथ स्वतः आबादी में आ जाएगा.

**स्टेप 5 →** अब, मैपिंग की प्रक्रिया शुरू करने के लिए **बेगिन मैपिंग** बटन पर क्लिक करें. चूंकि यह एक Ethereum an शामिल होता है, तो आपको अपने वॉलेट को आगे बढ़ने के लिए कनेक्ट करना होगा.

**स्टेप 6 →** आपको टोकन की जानकारी और मैपिंग को पूरा करने के लिए अनुमानित गैस की फीस के साथ एक रिव्यू मॉडल दिखाया जाएगा. विवरण को सत्यापित करें और बटन **को मैप करने के लिए Pay Gas Fi** का चयन करके मैपिंग the शुरू करें.

अपने वॉलेट से the the की पुष्टि करने के बाद, आपको Ethereum. पर पूरा होने के लिए the the का इंतजार करना पड़ता है. transaction the पूरा होने के बाद, आपको पॉलीगॉन PoS नेटवर्क पर अपने बच्चे टोकन पते के साथ सफलता मॉडल दिखाया जाएगा. आप [पॉलीगॉनस्कैन](https://polygonscan.com/) पर उत्पन्न बच्चे टोकन के पता की जांच करके मैपिंग को सत्यापित करना जारी रख सकते हैं.

मैननेट मैपिंग के लिए, आप [**पॉलीगॉन टोकन लिस्ट**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json) में जोड़े जाने के लिए [यहां](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) अपने टोकन डिटेल्स प्रदान कर सकते हैं.

:::tip

[<ins>कस्टम टोकन मैपिंग</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) के मामले में, आप हमारे [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) दस्तावेज का दौरा कर सकते हैं और टोकन को मैप करने के लिए अपने कस्टम FX को बनाने के लिए प्रदान की गई जानकारी का इस्तेमाल करते हैं.

:::

## वीडियो गाइड {#video-guide}

यहाँ एक त्वरित वीडियो ट्यूटोरियल है कि **कैसे Ethereum गोएर्ली** के बीच टोकनों को मैप करें  पॉलीगॉन मुंबई टेस्टनेट:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>आपका ब्राउज़र वीडियो एलिमेंट का समर्थन सहायता नहीं करता है.</p>
</video>
