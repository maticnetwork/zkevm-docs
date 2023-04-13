---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Kullanıcı için sağlanan dizin üzerinde token kimliğini getirir.'
---

`getTokenIdAtIndexForUser` metodu kullanıcı için sağlanan dizin üzerinde token kimliğini getirir.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
