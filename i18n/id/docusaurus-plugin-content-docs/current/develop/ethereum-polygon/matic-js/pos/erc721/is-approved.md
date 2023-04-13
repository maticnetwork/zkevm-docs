---
id: is-approved
title: isApproved
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'Memeriksa apakah suatu token disetujui untuk tokenID yang ditentukan.'
---

Metode `isApproved` memeriksa apakah token disetujui untuk tokenID yang ditentukan. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
