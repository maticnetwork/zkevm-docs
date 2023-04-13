---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: ' खास यूज़र के स्वामित्व वाले सभी टोकन पुनः प्राप्त करें.'
---

`getAllTokens` तरीका किसी खास यूज़र के स्वामित्व वाले सभी टोकन लौटाता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

आप दूसरे पैरामीटर में सीमा वैल्यू निर्धारित कर टोकन पर सीमा भी लगा सकते हैं.
