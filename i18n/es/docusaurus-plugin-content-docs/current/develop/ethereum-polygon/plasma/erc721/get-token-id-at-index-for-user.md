---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Empieza con Matic.js'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

El método `getTokenIdAtIndexForUser` muestra la ID del token en el índice suministrado para el usuario.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
