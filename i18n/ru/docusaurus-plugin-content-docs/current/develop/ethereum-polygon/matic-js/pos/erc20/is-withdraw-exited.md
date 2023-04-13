---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Проверьте, был ли выполнен выход из вывода.'
---

Метод `isWithdrawExited` можно использовать, чтобы узнать, был ли выполнен выход из вывода.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
