---
id: set-proof-api
title: ProofApi को सेट करें
keywords:
    - setProofApi
    - polygon
    - sdk
description: API के सबूत को कॉन्फ़िगर करें.
---

मैटिक.js में कुछ फंक्शन को तेजी से शब्द के साथ प्रत्यय लगाया जाता है. जैसा कि नाम सुझाता है, वे अपने non-faster समकक्षों की तुलना में तेजी से परिणाम उत्पन्न करते हैं. वे ऐसा करते हैं जो Proof  API का इस्तेमाल करके किसी के द्वारा होस्ट किया जा सकता है.

[https://apis/matic.network](https://apis/matic.network) पॉलीगॉन द्वारा होस्ट किया गया एक सार्वजनिक रूप से उपलब्ध Proof Generation API है.

यह `setProofApi`तरीका Proof र API के URL को मैटिक.Js इंस्टैंस में सेट करने में मदद कर सकता है.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

एक self-hosted की Proof Generation API सर्विस का इस्तेमाल करने से सार्वजनिक रूप से होस्ट किए गए एक की तुलना में बेहतर प्रदर्शन की पेशकश होगी.

कृपया सेवा को self-host करने के लिए https://github.com/maticnetwork/proof-generation-api में उपलब्ध अधिष्ठापन निर्देशों का पालन करें.

उदाहरण के लिए अगर आपने API के सबूत को डिप्लॉय कर दिया है और बेस url `https://abc.com/` है, तो आपको बेस url को `setProofApi` में सेट करने की आवश्यकता है

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
हम API के तेज इस्तेमाल की सिफारिश करते हैं, क्योंकि कुछ API में, विशेष रूप से जहां सबूत पैदा हो रहे हैं, बहुत सारे RPC कॉल बनाते हैं और यह सार्वजनिक RPC के साथ बहुत धीमा हो सकता है.
:::
