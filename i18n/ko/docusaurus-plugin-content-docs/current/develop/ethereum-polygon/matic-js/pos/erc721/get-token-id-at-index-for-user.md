---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: '사용자에게 제공된 색인의 토큰 ID를 검색합니다.'
---

`getTokenIdAtIndexForUser` 메서드는 사용자에게 제공된 색인의 토큰 ID를 검색합니다.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
