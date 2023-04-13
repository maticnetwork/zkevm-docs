---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: '지정된 사용자의 토큰 수를 반환합니다.'
---

`getTokensCount` 메서드는 지정된 사용자의 토큰 수를 반환합니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
