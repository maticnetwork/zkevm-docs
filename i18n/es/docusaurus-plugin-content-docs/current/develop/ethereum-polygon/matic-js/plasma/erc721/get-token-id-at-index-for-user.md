---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Devuelve la ID del token en el índice suministrado para el usuario.'
---

El método `getTokenIdAtIndexForUser` devuelve la ID del token en el índice suministrado para el usuario.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
