---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: '지정된 사용자가 소유한 모든 토큰을 반환합니다.'
---

`getAllTokens` 메서드는 지정된 사용자가 소유한 모든 토큰을 반환합니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

두 번째 매개변수에서 한도 값을 지정해 토큰의 한도를 설정할 수도 있습니다.
