---
id: deposit
title: 入金
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'ルートトークンから子トークンに必要な量を入金します。'
---

`deposit`メソッドを使用して、ルートトークンから子トークンに必要な額を預け入れできます。

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
