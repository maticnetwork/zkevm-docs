---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# isExitedMany {#isexitedmany}

Metode `isExitedMany` memeriksa apakah sudah keluar dari proses penarikan. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
