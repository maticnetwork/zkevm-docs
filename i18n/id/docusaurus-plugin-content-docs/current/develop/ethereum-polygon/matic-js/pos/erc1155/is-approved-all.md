---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Memeriksa apakah semua token disetujui.'
---

Metode `isApprovedAll` memeriksa apakah semua token disetujui untuk pengguna. Metode ini menampilkan nilai boolean.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
