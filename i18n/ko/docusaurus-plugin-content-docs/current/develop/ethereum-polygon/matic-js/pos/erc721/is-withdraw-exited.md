---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' 출금이 종료되었는지 확인합니다.'
---

`isWithdrawExited` 메서드는 출금이 종료되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
