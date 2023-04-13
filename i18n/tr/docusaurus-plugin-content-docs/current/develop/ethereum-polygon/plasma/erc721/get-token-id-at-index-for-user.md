---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# getTokenIdAtIndexForUser {#gettokenidatindexforuser}

`getTokenIdAtIndexForUser` metodu kullanıcı için sağlanan dizin üzerinde token kimliğini döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
