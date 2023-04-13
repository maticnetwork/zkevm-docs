---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Mendapatkan jumlah token untuk pengguna yang ditentukan.'
---

Metode `getTokensCount` akan menampilkan jumlah token untuk pengguna yang ditentukan.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
