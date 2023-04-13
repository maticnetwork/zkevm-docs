---
id: deposit
title: deposit
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Начните работать с maticjs'
---

# deposit {#deposit}

Метод `deposit` можно использовать для внесения в качестве депозита требуемой суммы с корневого токена на дочерний токен.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
