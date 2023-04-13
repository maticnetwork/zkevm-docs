---
id: withdraw-confirm
title: निकालने का चैलेंज
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# निकालने की पुष्टि करें {#withdrawconfirm}

`withdrawConfirm` तरीका प्लाज़्मा निकालने की प्रक्रिया का दूसरा स्टेप है. इस स्टेप में - आपके बर्न ट्रांज़ैक्शन (पहले ट्रांज़ैक्शन) का सबूत सबमिट किया जाता है और उसके बराबर वैल्यू का एक erc721 टोकन बनाया जाता है.

इस प्रक्रिया के सफ़ल हो जाने के बाद - चुनौती अवधि शुरू की जाती है और चुनौती अवधि के पूरा होने पर, यूज़र रुट चेन पर निकाली गई रकम को अपने अकाउंट में वापस ले सकता है.

मेननेट के लिए चुनौती अवधि सात दिन है.

**नोट**- किसी निकालने को चुनौती देने के लिए निकालना शुरू करने की ट्रांज़ैक्शन शुरू करने को चेकपॉईन्ट करना चाहिए.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

चुनौती अवधि पूरी होने पर, निकालने की प्रक्रिया से बाहर निकलने और निकाली गई रकम पाने के लिए `withdrawExit` का सहारा लिया जा सकता है.
