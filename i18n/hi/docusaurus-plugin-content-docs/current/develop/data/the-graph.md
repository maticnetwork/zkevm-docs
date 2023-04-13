---
id: the-graph
title: पॉलीगॉन पॉस और ग्राफ़ के साथ कोई प्रोजेक्ट सेट अप करना
sidebar_label: The Graph
description: जानें कि ग्राफ़ और पॉलीगॉन के साथ होस्ट किया गया प्रोजेक्ट कैसे सेट अप करें.
keywords:
  - polygon
  - matic
  - graph
  - the graph
  - index
  - query
  - subgraph
image: https://matic.network/banners/matic-network-16x9.png
slug: graph
---

import useBaseUrl from '@docusaurus/useBaseUrl';

ग्राफ़, चेन डेटा को इंडेक्स करने और क्वेरी करने का एक विकेंद्रित प्रोटोकॉल है जो मैटिक चेन का समर्थन करता है. सबग्राफ़्स के माध्यम से परिभाषित डेटा क्वेरी करने और समझने में आसान होता है. सबग्राफ़्स स्थानीय रूप से बनाए जा सकते हैं, या इंडेक्स करने और डेटा दिखाने के लिए किसी फ़्री होस्टेड एक्सप्लोरर का इस्तेमाल करें.

> नोट: अधिक विवरण, स्थानीय इंस्टॉलेशन तथा अधिक जानने के लिए https://thegraph.com/docs/quick-start देखें. डॉक्यूमेंट में यह जानने के लिए एक उदाहरण शामिल है कि सबग्राफ़्स कैसे काम करते हैं और यह वीडियो इसका अच्छा परिचय देता है.

## स्टेप्स {#steps}

1. ग्राफ़ एक्सप्लोरर (https://thegraph.com/explorer/) पर जाएँ और एक अकाउंट सेटअप करें. प्रमाणीकरण के लिए आपको एक GitHub अकाउंट चाहिए होगा.

2. अपने डैशबोर्ड पर जाएँ और सबग्राफ़ जोड़ें पर क्लिक करें. सबग्राफ़ का नाम, अकाउंट तथा सबटाइटल का विवरण दें और अगर माँगी गई हो, तो इमेज तथा अन्य जानकारी अपडेट करें (आप बाद में भी अपडेट कर सकते हैं).

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. अपनी मशीन पर (npm या yarn का इस्तेमाल करके) ग्राफ़ CLI इंस्टॉल करें

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. ये कमांड एक सबग्राफ़ बनाता है जो पहले से मौजूद कॉन्ट्रैक्ट के सभी इवेंट को इंडेक्स करता है. यह BlockScout से कॉन्ट्रैक्ट ABI सर्च करने का प्रयास करता है और एक स्थानीय फ़ाइल पाथ का अनुरोध करने के लिए वापस आ जाता है. अगर कोई वैकल्पिक आर्गुमेंट गायब रह गई हो, तो यह आपको एक इंटरेक्टिव फ़ॉर्म में शामिल विस्तृत जानकारी देता है.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Matic” for Matic mainnet and “Mumbai” for Matic Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on the Matic network: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> नोट: अधिक विवरण यहाँ हैं: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. होस्टेड सर्विस से प्रमाणित करें

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
आपको ग्राफ़ वेबसाइट पर अपने डैशबोर्ड पर जाकर एक्सेस टोकन मिला सकता है.

6. जो डायरेक्टरी आपने बनाई है उसमें cd करें और सबग्राफ़ का विवरण देना शुरू करें. सबग्राफ़ बनाने की जानकारी ग्राफ़ डॉक्यूमेंट्स में यहाँ उपलब्ध है. https://thegraph.com/docs/define-a-subgraph

7. जब आप तैयार हों, तो अपना सबग्राफ़ डिप्लॉय करें. आप ज़रूरत के हिसाब से कभी भी टेस्ट और दोबारा डिप्लॉय कर सकते हैं.

> अगर आपका पहले से डिप्लॉय किया हुआ सबग्राफ़ अभी भी सिंकिंग स्टेटस में है, तो उसे तुरंत नए डिप्लॉय किए गए वर्ज़न से बदल दिया जाएगा. अगर पहले से डिप्लॉय किया गया सबग्राफ़ पहले से ही पूरी तरह से सिंक हो चुका है, तो ग्राफ़ नोड नए डिप्लॉय किए वर्ज़न को पेंडिंग वर्ज़न के रूप में चिह्नित करेगा, इसे बैकग्राउंड में सिंक करेगा, और सिर्फ नए वर्ज़न की सिंकिंग पूरी हो जाने के बाद ही मौजूदा समय में डिप्लॉय किए गए वर्ज़न को नए वर्ज़न से बदलेगा. यह सुनिश्चित करता है कि जब नया वर्ज़न सिंक हो रहा है, तब भी आपके पास काम करने के लिए कोई सबग्राफ़ मौजूद है.

```bash
yarn deploy
```

आपका सबग्राफ़ डिप्लॉय किया जाएगा और आपके डैशबोर्ड से एक्सेस हो पाएगा.

आप सबग्राफ़ को क्वेरी करने के बारे में यहाँ सीख सकते हैं: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

अगर आप अपने सबग्राफ़ को पब्लिक करना चाहते हैं, तो आप अपने सबग्राफ़ को अपने डैशबोर्ड से एक्सेस करके और फिर एडिट बटन पर क्लिक करके ऐसा कर सकते हैं. एडिट पेज के निचले हिस्से पर आपको स्लाइडर दिखेगा.
