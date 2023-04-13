---
id: get-tokens-count
title: टोकन की संख्या पाएँ
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'किसी ख़ास यूज़र के लिए टोकन संख्या वापस करता है.'
---

`getTokensCount` तरीका किसी खास यूज़र के लिए टोकन की संख्या वापस है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
