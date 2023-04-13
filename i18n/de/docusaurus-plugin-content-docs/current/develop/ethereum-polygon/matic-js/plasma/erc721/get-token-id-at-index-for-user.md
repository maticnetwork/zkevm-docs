---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Gibt die Token-ID des angegebenen Index für den Benutzer zurück'
---

`getTokenIdAtIndexForUser`-Methode gibt die Token-ID des angegebenen Index für den Benutzer zurück

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
