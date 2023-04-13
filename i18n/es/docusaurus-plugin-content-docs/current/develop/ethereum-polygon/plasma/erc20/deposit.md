---
id: deposit
title: deposit (Depósito)
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Empieza con Matic.js'
---

# deposit {#deposit}

El método `deposit` se puede utilizar para depositar el monto requerido del token primario al token secundario.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
