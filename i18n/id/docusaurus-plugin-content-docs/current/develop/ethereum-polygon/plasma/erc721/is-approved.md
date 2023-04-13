---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# isApproved {#isapproved}

Metode `isApproved` memeriksa apakah token sudah disetujui untuk tokenId yang ditentukan. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
