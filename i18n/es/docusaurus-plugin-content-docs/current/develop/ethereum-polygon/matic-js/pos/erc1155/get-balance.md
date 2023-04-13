---
id: get-balance
title: getBalance (Obtener saldo)
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Obtén el saldo del token ERC-1155 con matic.js.'
---

El método `getBalance` puede utilizarse para obtener el saldo del usuario para un token. Está disponible en el token secundario y primario.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
