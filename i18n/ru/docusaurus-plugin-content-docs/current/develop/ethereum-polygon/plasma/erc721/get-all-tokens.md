---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Начните работать с maticjs'
---

# getAllTokens {#getalltokens}

Метод `getAllTokens` возвращает все токены, принадлежащие указанному пользователю.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

также вы можете установить лимит токенов, задав значение лимита во втором параметре.
