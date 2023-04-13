---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Memeriksa apakah sudah keluar dari proses penarikan.'
---

Metode `isWithdrawExited` memeriksa apakah sudah keluar dari proses penarikan. Metode ini akan menampilkan nilai boolean.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
