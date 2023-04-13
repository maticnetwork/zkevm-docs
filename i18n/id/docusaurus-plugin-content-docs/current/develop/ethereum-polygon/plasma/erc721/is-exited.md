---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# isExited {#isexited}

Metode `isExited` memeriksa apakah sudah keluar dari proses penarikan. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
