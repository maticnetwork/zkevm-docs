---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Mendapatkan saldo dari pengguna.'
---

Metode `getBalance` dapat digunakan untuk mendapatkan saldo pengguna. Metode ini tersedia pada token anak dan induk.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
