---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# Il metodo getTokenIdAtIndexForUser {#gettokenidatindexforuser}

`getTokenIdAtIndexForUser` restituisce l'id del token sull'indice fornito per l'utente.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
