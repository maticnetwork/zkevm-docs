---
id: new-to-polygon
title: पॉलीगॉन में आपका स्वागत
description: पॉलीगॉन पर अगले ब्लॉकचेन ऐप को बिल्ड करें
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# पॉलीगॉन में आपका स्वागत {#welcome-to-polygon}

पॉलीगॉन सार्वजनिक ब्लॉकचेन के लिए एक स्केलिंग सोल्यूशन है. पॉलीगॉन पॉस ज़्यादा तेज़ और सस्ते ट्रांज़ैक्शनों के साथ, पहले से मौजूद सभी एथेरेयम टूल के साथ काम कर सकता है.

## पॉलीगॉन पर इंटरैक्शन के प्रकार {#types-of-interaction-on-polygon}

* [पॉलीगॉन पॉसचेन](/docs/develop/getting-started)
* [पॉस ब्रिज के साथ एथेरेयम + पॉलीगॉन](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [प्लाज़्मा ब्रिज के साथ एथेरेयम + पॉलीगॉन](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## ब्लॉकचेन में क्वेरी का उपयोग {#query-the-blockchain}

ज़्यादातर ब्लॉकचेन इंटरेक्शन में इंटेरेक्टिव स्टेट को पढ़ना शामिल होता है.

एल्केमी इस बात पर एक संदर्भ गाइड प्रदान करता है कि ब्लॉकचेन को बुनियादी अनुरोधों को कैसे बनाना है. [पॉलीगॉन से पूछताछ करने के लिए कैसे](https://docs.alchemy.com/reference/polygon-sdk-examples) उनके गाइड को बाहर निकालें

## स्मार्ट कॉन्ट्रैक्ट डिप्लॉय करें {#deploy-smart-contracts}

* पॉलीगॉन पर अपने कॉन्ट्रैक्ट डिप्लॉय करें
    - [एल्केमी का उपयोग करना](/docs/develop/alchemy)
    - [चेनस्टैक का उपयोग करना](/docs/develop/chainstack)
    - [क्विकनोड का उपयोग करना](/docs/develop/quicknode)
    - [रीमिक्स का उपयोग करना](/docs/develop/remix)
    - [ट्रफ़ल का उपयोग करना](/docs/develop/truffle)
    - [हार्डहैट का उपयोग करना](/docs/develop/hardhat)

:::note

Web3 RPC-URL को "https://rpc-mumbai.matic.today", "https://rpc-mumbai.matic.today", के लिए कॉन्फ़िगर करें और सब कुछ वैसा ही बना रहता है.

:::

## ब्लॉकचेन क्या है? {#what-is-a-blockchain}

सरल भाषा में, ब्लॉकचेन ट्रांज़ैक्शन रिकॉर्ड करने, असेट्स पर नज़र रखने और विश्वास बनाने के लिए एक साझा की हुई, अपरिवर्तनीय लेजर है. ज़्यादा पढ़ने के लिये [ब्लॉकचेन बेसिक्स](blockchain-basics/basics-blockchain.md) पर जाएँ.

## साइडचेन क्या है? {#what-is-a-sidechain}

एक साइडचेन के पेरेंट ब्लॉकचेन के क्लोन के रूप में होने की कल्पना करें, जो मेनचेन में परिसंपातियों को यहाँ से वहाँ ट्रांसफर को सपोर्ट करती है. यह मेनचेन का एक विकल्प है जो अपने ब्लॉक बनाने के मैकेनिज्म (सहमति मैकेनिज्म) के साथ एक नई ब्लॉकचेन बनाती है. एक पेरेंट चेन के साथ साइडचेन को जोड़ने में चेनों के बीच परिसंपत्तियों के आवागमन का तरीका स्थापित करना शामिल है.

## वैलिडेटर और डेलीगेटर की भूमिका {#validator-and-delegator-roles}

पॉलीगॉन नेटवर्क पर आप एक वैलिडेटर या डेलीगेटर हो सकते हैं. देखें:

* [वैलिडेटर कौन है](/docs/maintain/polygon-basics/who-is-validator)
* [डेलीगेटर कौन है](/docs/maintain/polygon-basics/who-is-delegator)

## आर्किटेक्चर {#architecture}

यदि आपका लक्ष्य वैलिडेटर बनना है, तो आपका पॉलीगॉन आर्किटेक्चर को समझना आवश्यक है.

[पॉलीगॉन आर्किटेक्चर](/docs/maintain/validator/architecture) को देखें.

### घटक {#components}

पॉलीगॉन आर्किटेक्चर की बारीक समझ के लिये, निम्नलिखित घटक देखें:

* [हेम्डल](/docs/pos/heimdall/overview)
* [बोर](/docs/pos/bor/overview)
* [कॉन्ट्रैक्ट](/docs/pos/contracts/stakingmanager)

#### कोडबेस {#codebases}

प्रमुख घटकों की एक बारीक समझ के लिए, ये कोडबेस देखें:

* [हेम्डल](https://github.com/maticnetwork/heimdall)
* [बोर](https://github.com/maticnetwork/bor)
* [कॉन्ट्रैक्ट](https://github.com/maticnetwork/contracts)

## कैसे करें {#how-tos}

### नोड सेटअप {#node-setup}

अगर आप पॉलीगॉन मैननेट या मुंबई टेस्टनेट पर एक पूरा नोड चलाना चाहते हैं, तो आप उस का पालन कर सकते हैं [एक वैलिडेटर नोड](/maintain/validate/run-validator.md) गाइड रन करें.

### स्टेकिंग ऑपरेशन {#staking-operations}

* [वैलिडेटर स्टेकिंग ऑपरेशन](/docs/maintain/validate/validator-staking-operations)
* [डेलिगेट करें](/docs/maintain/delegate/delegate)

### बाहरी रिसोर्स {#external-resources}
- [आपका पहला dapp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [साइडचेनें और चाइल्डचेनें](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)