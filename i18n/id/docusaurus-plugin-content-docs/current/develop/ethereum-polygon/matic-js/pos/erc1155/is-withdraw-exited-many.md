---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Memeriksa apakah sudah keluar dari proses penarikan untuk banyak token.'
---

Metode `isWithdrawExitedMany` memeriksa apakah sudah keluar dari proses penarikan untuk banyak token. Metode ini menampilkan nilai boolean.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
