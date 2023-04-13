---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Извлеките индикатор токена с указанным индексом для пользователя.'
---

Метод `getTokenIdAtIndexForUser` возвращает идентификатор токена с указанным индексом для пользователя.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
