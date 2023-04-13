---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Mendapatkan saldo token ERC1155 menggunakan matic.js.'
---

Metode `getBalance` dapat digunakan mendapatkan saldo pengguna untuk suatu token. Metode ini tersedia pada token anak dan induk.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
