---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Проверяет, имел ли место выход из вывода в отношении множественных токенов.'
---

Метод `isWithdrawExitedMany` проверяет, имел ли место выход из вывода в отношении множественных токенов. Он возвращает логическое значение.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
