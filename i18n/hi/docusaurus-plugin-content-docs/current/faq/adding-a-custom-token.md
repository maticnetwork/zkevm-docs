---
id: adding-a-custom-token
title: कस्टम टोकन जोड़ना
sidebar_label: Adding a Custom Token
description: पॉलीगॉन पर अपनी अगली ब्लॉकचेन ऐप बनाएँ.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**कस्टम टोकन जोड़ें** फ़ीचर आपको टोकन स्पष्ट रूप से जोड़ने और पॉलीगॉन वॉलेट सूट के साथ इस्तेमाल करने देता है. आपको सिर्फ कॉन्ट्रैक्ट पते के द्वारा टोकन की खोज करनी होगी, या रूट या चाइल्ड से:

* **रुट** एथेरेयम पर कॉन्ट्रैक्ट टोकन है
* **चाइल्ड** पॉलीगॉन पर कॉन्ट्रैक्ट है

### मुझे टोकन अनुबंध कैसे मिलेगा? {#how-do-i-find-the-token-contract}

आप या तो [Coingecko](http://coingecko.com) या [Coinmarketcap](https://coinmarketcap.com/) पर टोकेन को उसके नाम से खोज सकते हैं जहाँ एथेरेयम चेन (ERC 20 टोकन के लिए) और पॉलीगॉन जैसी अन्य समर्थित अनुवर्ती चेन पर पता देख पाएँगे. अन्य चेन पर टोकन का पता शायद अपडेट नहीं किया किया गया हो लेकिन आप सभी उद्देश्यों के लिए रुट पते का उपयोग ज़रूर कर सकते हैं.

तो कोई टोकन चुनते समय, आप निम्न का इस्तेमाल कर उसे खोज पाएँगे:
* टोकन सिंबल
* टोकन नाम
* कॉन्ट्रैक्ट

यह कैसे काम करता है उसकी जानकारी नीचे है:

1. कस्टम टोकन के रूप टोकन पता जोड़कर आप आसानी से कोई टोकन अपनी सूची में जोड़ सकते हैं (हम कॉन्ट्रैक्ट पते का

समर्थन पॉलीगॉन या एथेरेयम दोनों पर करते हैं):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. जानकारी आने के बाद, आपको टोकेन की पूरी जानकारी के साथ पुष्टि स्क्रीन दिखाई देगा. फिर आप कस्टम टोकन के रूप में उसे जोड़ सकते हैं जिसे आपके सिस्टम में स्थानीय रूप से रखा जाएगा, हम सुझाव देते हैं कि आप टोकन कॉन्ट्रैक्टों को दोबारा सत्यापित करें क्योंकि बहुत से क्लोन या घोटाले वाले टोकन होते हैं:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. आपका जोड़ा गया टोकन चुनते समय अब दिखाया जाएगा:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

आप **मैनेज** स्क्रीन के टोकन टैब से सीधे टोकन जोड़ सकते हैं:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>