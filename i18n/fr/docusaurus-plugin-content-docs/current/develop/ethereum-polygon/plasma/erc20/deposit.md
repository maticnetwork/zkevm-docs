---
id: deposit
title: déposer
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# déposer {#deposit}

`deposit`méthode peut être utilisée pour déposer le montant requis du jeton root au jeton enfant.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
