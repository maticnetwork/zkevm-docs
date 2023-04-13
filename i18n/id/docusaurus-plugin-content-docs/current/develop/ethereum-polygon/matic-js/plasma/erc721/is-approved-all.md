---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Memeriksa apakah semua token disetujui.'
---

Metode `isApprovedAll` memerika apakah semua token disetujui. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
