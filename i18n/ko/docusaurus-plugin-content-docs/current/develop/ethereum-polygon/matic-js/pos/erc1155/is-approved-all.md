---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: '모든 토큰이 승인되었는지 확인합니다.'
---

`isApprovedAll` 메서드는 사용자의 모든 토큰이 승인되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
