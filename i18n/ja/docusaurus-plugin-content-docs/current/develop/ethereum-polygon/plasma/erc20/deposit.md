---
id: deposit
title: デポジット
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# デポジット {#deposit}

`deposit`メソッドを使用して、ルートトークンから子トークンに必要な金額をデポジットできます。

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
