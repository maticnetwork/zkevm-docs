---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: '여러 토큰의 출금이 종료되었는지 확인합니다.'
---

`isWithdrawExitedMany` 메서드는 여러 토큰의 출금이 종료되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
