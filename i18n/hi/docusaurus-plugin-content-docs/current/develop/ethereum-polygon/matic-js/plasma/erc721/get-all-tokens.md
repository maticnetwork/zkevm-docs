---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'किसी खास यूज़र के स्वामित्व वाले सभी टोकन लौटाता है.'
---

`getAllTokens` तरीका किसी खास यूज़र के स्वामित्व वाले सभी टोकन को लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

आप दूसरे पैरामीटर में सीमा वैल्यू निर्धारित कर टोकनों को सीमित भी कर सकते हैं.
