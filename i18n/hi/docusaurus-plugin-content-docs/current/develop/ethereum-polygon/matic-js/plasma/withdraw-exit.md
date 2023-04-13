---
id: withdraw-exit
title: निकालने से बाहर निकलें
keywords:
- 'plasma client, withdrawExit, polygon, sdk'
description: 'निकालने की प्रक्रिया से बाहर निकलें.'
---

प्लाज़्मा निकालने की प्रक्रिया में कोई भी व्यक्ति `withdrawExit`तरीके का इस्तेमाल कर बाहर निकल सकता है. बाहर निकालने की प्रक्रिया चुनौती अवधि पूरी होने के बाद ही काम करेगी.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

आप ऐरे में टोकन लिस्ट देकर भी कई टोकन के लिए बाहर निकल सकते हैं.
