---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# isApprovedAll  {#isapprovedall}

Metode `isApprovedAll` memeriksa apakah semua token telah disetujui. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
