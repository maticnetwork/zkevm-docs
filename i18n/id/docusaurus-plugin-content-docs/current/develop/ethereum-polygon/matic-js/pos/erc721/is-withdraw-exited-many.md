---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Memeriksa apakah sudah keluar dari proses penarikan untuk banyak token.'
---

Metode `isWithdrawExitedMany` memeriksa apakah sudah keluar dari proses penarikan untuk banyak token. Metode ini menampilkan nilai boolean.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
