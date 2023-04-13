---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Recupera l''ID del token sull''indice fornito per l''utente.'
---

Il metodo `getTokenIdAtIndexForUser` restituisce l'ID del token sull'indice fornito per l'utente.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
