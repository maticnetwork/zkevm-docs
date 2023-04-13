---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: '출금이 종료되었는지 확인합니다.'
---

`isWithdrawExited` 메서드를 사용해 출금이 종료되었는지 확인할 수 있습니다.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
