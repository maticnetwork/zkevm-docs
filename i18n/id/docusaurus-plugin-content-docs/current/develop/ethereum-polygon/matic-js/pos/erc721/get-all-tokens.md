---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Mengambil semua token yang dimiliki oleh pengguna yang ditentukan.'
---

Metode `getAllTokens` menampilkan semua token yang dimiliki oleh pengguna yang ditentukan.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Anda juga dapat membatasi token dengan menentukan nilai batas dalam parameter kedua.
