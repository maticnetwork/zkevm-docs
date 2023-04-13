---
id: deposit
title: fon yatırın
keywords:
- 'pos client, erc20, approveMax, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# fon yatırın {#deposit}

`deposit` metodu kök token'dan alt token'a gerekli miktarda fon yatırmak için kullanılabilir.

```
const erc20RootToken = plasmaClient.erc20(<root token address>,true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
