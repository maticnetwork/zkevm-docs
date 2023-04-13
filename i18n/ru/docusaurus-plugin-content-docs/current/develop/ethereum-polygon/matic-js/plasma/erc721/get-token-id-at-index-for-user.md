---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Возвращает идентификатор токена с указанным индексом для пользователя.'
---

Метод `getTokenIdAtIndexForUser` возвращает идентификатор токена с указанным индексом для пользователя.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
