---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'Mengambil id token pada indeks yang diberikan untuk pengguna.'
---

Metode `getTokenIdAtIndexForUser` akan menampilkan id token pada indeks yang diberikan untuk pengguna.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
