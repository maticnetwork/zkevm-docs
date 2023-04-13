---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Token-ID auf dem gelieferten Index für den Benutzer abrufen.'
---

Die `getTokenIdAtIndexForUser`-Methode liefert die Token-ID am angegebenen Index des Benutzers.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
