---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' Memeriksa apakah telah keluar dari proses penarikan.'
---

Metode `isWithdrawExited` memeriksa apakah telah keluar dari proses penarikan. Metode ini akan menampilkan nilai boolean.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
