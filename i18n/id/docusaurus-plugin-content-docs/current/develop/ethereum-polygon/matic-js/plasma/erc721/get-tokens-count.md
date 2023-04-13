---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Menampilkan jumlah token untuk pengguna yang ditentukan.'
---

Metode `getTokensCount` akan menampilkan jumlah token untuk pengguna yang ditentukan.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
