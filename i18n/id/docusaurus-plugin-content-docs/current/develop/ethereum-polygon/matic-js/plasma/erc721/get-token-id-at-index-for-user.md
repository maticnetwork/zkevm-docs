---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Menampilkan id token pada indeks yang diberikan untuk pengguna.'
---

Metode `getTokenIdAtIndexForUser` akan menampilkan id token pada indeks yang diberikan untuk pengguna.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
