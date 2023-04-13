---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Restituisce l''id del token sull''indice fornito per l''utente.'
---

Il metodo `getTokenIdAtIndexForUser` restituisce l'id del token sull'indice fornito per l'utente.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
