---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Maticjs를 시작합니다'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

`getTokenIdAtIndexForUser` 메서드는 사용자에게 제공된 색인의 토큰 ID를 반환합니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
