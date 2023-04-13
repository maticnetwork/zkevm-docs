---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'Memeriksa apakah semua token disetujui.'
---

Metode `isApprovedAll` memeriksa apakah semua token disetujui. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
