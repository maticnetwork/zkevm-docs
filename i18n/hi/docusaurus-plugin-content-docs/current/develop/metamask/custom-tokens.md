---
id: custom-tokens
title: कस्टम टोकन कॉन्फ़िगर
description: मेटामास्क पर कस्टम टोकन कॉन्फ़िगर करें.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

यह पेज मेटामास्क में कस्टम टोकन जोड़ने की प्रक्रिया को दर्शाता है.

आप Metamask. पर किसी भी नेटवर्क में किसी भी कस्टम टोकन को जोड़ने के लिए उसी प्रक्रिया का इस्तेमाल कर सकते हैं. आप [इस तालिका](#tokens-and-contract-adresses) को अपने कॉन्ट्रैक्ट एड्रेस के साथ टेस्ट टोकन के कुछ उदाहरणों को देखने के लिए संदर्भित कर सकते हैं.

## अपने मेटामास्क अकाउंट में एक कस्टम टोकन जोड़ना {#adding-a-custom-token-to-your-metamask-account}

सबसे पहले, अपने मेटामास्क के होम स्क्रीन पर नए टोकन के लिए उपयुक्त नेटवर्क चुनें. फिर "टोकन इम्पोर्ट पर क्लिक करें.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

इसके बाद यह आपको एक नई स्क्रीन में नेविगेट करेगा. इम्पोर्ट टोकन स्क्रीन पर, टोकन पता क्षेत्र में एक पता को कॉपी पेस्ट करें

:::info
इस प्रक्रिया को दर्शाने के लिए, हम **गोएर्ली नेटवर्क** पर **ERC20-TestV4** टोकन का इस्तेमाल कर रहे हैं. [<ins>यहाँ</ins>](#tokens-and-contract-adresses) के अन्य नेटवर्क से टेस्ट टोकन को ढूंढो.
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

अन्य फ़ील्ड ऑटो-पॉप्यूलेट होंगे. कस्टम टोकन को जोड़ने पर क्लिक करें और फिर इम्पोर्ट टोकन पर क्लिक करें. `TEST` टोकन अब आपके मेटामास्क अकाउंट पर प्रदर्शित होना चाहिए.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**अपने मेटामास्क अकाउंट में एक टेस्ट ERC1155 टोकन जोड़ना**

जबकि पॉलीगॉन नेटवर्क ERC1155 को सपोर्ट करता है, [मेटामास्क अभी भी स्टैंडर्ड को सपोर्ट नहीं करता है](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). यह अपडेट 2021 की चौथी तिमाही में आ सकता है.

### टोकन और कॉन्ट्रैक्ट एड्रेस {#tokens-and-contract-adresses}

| टोकन | नेटवर्क | कॉन्ट्रैक्ट पते |
|---------------|---------|----------------------------------------------|
| ERC20-TestV4 | गोएर्ली | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TestV4 | गोएर्ली | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TestV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |