---
id: deposit
title: deposit (Depositar)
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Deposita la cantidad requerida del token primario al token secundario.'
---

El método `deposit` se puede utilizar para depositar la cantidad requerida del token primario al token secundario.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Podría demorar un poco que la cantidad depositada se refleje en la cadena de Polygon. Puedes usar el método [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) para verificar el estado.
