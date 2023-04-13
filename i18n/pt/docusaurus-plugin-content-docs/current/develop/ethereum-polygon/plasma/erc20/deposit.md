---
id: deposit
title: depositar
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Introdução ao maticjs'
---

# depositar {#deposit}

O método `deposit` pode ser usado para depositar o valor necessário do token root para o token filho.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
