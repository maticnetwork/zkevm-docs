---
id: withdraw-confirm-faster
title: तेज़ी से निकालने की चुनौती
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# निकालने को तेज़ी से मंज़ूरी दें {#withdrawconfirmfaster}

`withdrawConfirmFaster` तरीका प्लाज़्मा निकालने की प्रक्रिया में दूसरा स्टेप है. इस स्टेप में, आपके बर्न ट्रांज़ैक्शन (पहले ट्रांज़ैक्शन) का सबूत सबमिट किया जाता है और उसके बराबर वैल्यू का एक erc721 टोकन बनाया जाता है.

इस प्रक्रिया के सफल होने के बाद, चुनौती अवधि शुरू की जाती है और चुनौती अवधि पूरी होने पर यूज़र रुट चेन पर निकाली रकम को वापस ले सकता है.

मेननेट के लिए चुनौती अवधि सात दिन है.

<div class="highlight mb-20px mt-20px">
यह इसलिए तेज़ होता है क्योंकि यह सबूत बैकएंड में बनाता है. आपको [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api) को कॉन्फ़िगर करना होगा.
</div>

**नोट**- किसी निकालने को चुनौती देने के लिए निकालना शुरू करने की ट्रांज़ैक्शन को चेकपॉईन्ट किया होना चाहिए.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

चुनौती अवधि पूरी होने पर, निकालने की प्रक्रिया से बाहर निकलने और निकाली गई रकम पाने के लिए `withdrawExit` का सहारा लिया जा सकता है.
