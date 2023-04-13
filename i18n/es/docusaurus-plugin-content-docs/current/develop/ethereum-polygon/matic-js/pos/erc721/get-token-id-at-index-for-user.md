---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Arroja la ID del token en el índice suministrado para el usuario.'
---

El método `getTokenIdAtIndexForUser` arroja la ID del token en el índice suministrado para el usuario.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
