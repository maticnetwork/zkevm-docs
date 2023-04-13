---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Проверяет, был ли выполнен выход из вывода.'
---

Метод `isWithdrawExited` проверяет, был ли выполнен выход из вывода. Он возвращает логическое значение.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
