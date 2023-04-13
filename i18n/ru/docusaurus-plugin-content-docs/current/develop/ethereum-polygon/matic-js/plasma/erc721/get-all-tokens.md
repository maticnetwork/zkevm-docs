---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Возвращает информацию обо всех токенах, принадлежащих указанному пользователю.'
---

Метод `getAllTokens` возвращает информацию обо всех токенах, принадлежащих указанному пользователю.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

также вы можете установить лимит токенов, задав значение лимита во втором параметре.
