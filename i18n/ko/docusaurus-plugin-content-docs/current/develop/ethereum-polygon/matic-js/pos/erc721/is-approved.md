---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: '특정 토큰 ID의 토큰이 승인되었는지 확인합니다.'
---

`isApproved` 메서드는 특정 토큰 ID의 토큰이 승인되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
