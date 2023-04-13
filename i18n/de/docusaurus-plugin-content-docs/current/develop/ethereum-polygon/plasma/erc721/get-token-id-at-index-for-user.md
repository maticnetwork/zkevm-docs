---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

Die `getTokenIdAtIndexForUser`-Methode retourniert die Token-ID am angegebenen Index des Benutzers.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
