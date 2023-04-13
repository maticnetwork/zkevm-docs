---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# getAllTokens {#getalltokens}

Metode `getAllTokens` akan menampilkan semua token yang dimiliki pengguna yang ditentukan.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Anda juga dapat membatasi token dengan menentukan nilai batas dalam parameter kedua.
