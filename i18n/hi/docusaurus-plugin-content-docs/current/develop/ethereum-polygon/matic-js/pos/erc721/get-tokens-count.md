---
id: get-tokens-count
title: टोकन की गिनती पाएँ
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'किसी खास यूज़र के लिए टोकन की गिनती पाएँ.'
---

`getTokensCount` तरीका किसी खास यूज़र के लिए टोकन की गिनती देता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
