---
id: withdraw-confirm
title: निकालने का चैलेंज
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# निकालने की पुष्टि करें {#withdrawconfirm}

`withdrawConfirm` तरीका प्लाज़्मा निकालने की प्रक्रिया का दूसरा स्टेप है. इस स्टेप में, आपके बर्न ट्रांज़ैक्शन (पहले ट्रांज़ैक्शन) का सबूत सबमिट किया जाता है और उसके बराबर वैल्यू का एक erc721 टोकन बनाया जाता है.

इस प्रक्रिया के सफल होने के बाद, चुनौती अवधि शुरू की जाती है और चुनौती अवधि पूरी होने पर यूज़र अपने चेन रुट अकाउंट में निकाली रकम को वापस ले सकता है.

मेननेट के लिए चुनौती अवधि सात दिन है.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
