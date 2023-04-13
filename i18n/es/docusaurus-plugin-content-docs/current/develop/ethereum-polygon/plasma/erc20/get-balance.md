---
id: get-balance
title: getBalance (Obtener saldo)
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Empieza con Matic.js'
---

# getBalance (Obtener saldo) {#getbalance}

El método `getBalance` se puede utilizar para obtener el saldo del usuario. Está disponible en el token secundario y primario.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
