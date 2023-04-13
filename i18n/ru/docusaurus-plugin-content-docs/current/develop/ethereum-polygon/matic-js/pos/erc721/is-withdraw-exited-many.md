---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Проверяет, имел ли место выход из вывода в отношении множественных токенов.'
---

Метод `isWithdrawExitedMany` проверяет, имел ли место выход из вывода в отношении множественных токенов. Он возвращает логическое значение.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
