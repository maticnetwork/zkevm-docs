---
id: withdraw-exit
title: निकालने से बाहर निकलें
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# निकालने से बाहर निकलें {#withdrawexit}

प्लाज़्मा निकालने में `withdrawExit` तरीके का इस्तेमाल करते हुए किसी के द्वारा भी प्रक्रिया से बाहर निकला जा सकता है. बाहर निकालने की प्रक्रिया चुनौती अवधि पूरी होने के बाद ही काम करेगी.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

आप ऐरे में टोकन लिस्ट देकर भी कई टोकन के लिए बाहर निकल सकते हैं.
