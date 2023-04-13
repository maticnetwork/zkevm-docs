---
id: get-tokens-count
title: टोकन की गिनती पाएँ
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# टोकन की गिनती पाएँ {#gettokenscount}

`getTokensCount`तरीका किसी खास यूज़र के लिए टोकन की गिनती देता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
