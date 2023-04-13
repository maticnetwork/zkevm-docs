---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Проверьте, был ли выполнен выход из вывода.'
---

Метод `isWithdrawExited` проверяет, был ли выполнен выход из вывода. Он возвращает логическое значение.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
