---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: '출금이 종료되었는지 확인합니다.'
---

`isExited` 메서드는 출금이 종료되었는지 확인합니다. 불리언 값을 반환합니다.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
