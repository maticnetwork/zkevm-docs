---
id: deposit
title: depositar
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Depositar o valor necessário do token ROOT para o token filho.'
---

O método `deposit` pode ser usado para depositar o valor necessário do token root para o token filho.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Pode levar algum tempo para reflectir o valor depositado na chain da Polygon. Você pode usar o método [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) para verificar o estado.
