---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: '여러 토큰의 출금이 종료되었는지 확인합니다.'
---

`isWithdrawExitedMany` 메서드는 여러 토큰의 출금이 종료되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
