---
id: deposit
title: deposit
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: ' Внесите в качестве депозита требуемое количество с коренного токена на дочерний токен.'
---

Метод `deposit` можно использовать для внесения в качестве депозита требуемого количества с корневого токена на дочерний токен.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
