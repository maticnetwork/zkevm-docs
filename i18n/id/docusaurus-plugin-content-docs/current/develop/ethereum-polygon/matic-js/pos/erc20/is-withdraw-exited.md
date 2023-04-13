---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Memeriksa apakah sudah keluar dari penarikan atau belum.'
---

Metode `isWithdrawExited` dapat digunakan untuk mengetahui apakah sudah keluar dari penarikan atau belum.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
