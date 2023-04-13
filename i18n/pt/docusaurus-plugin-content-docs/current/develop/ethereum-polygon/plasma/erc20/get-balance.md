---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Introdução ao maticjs'
---

# getBalance {#getbalance}

O método `getBalance` pode ser usado para obter o saldo do utilizador. Está disponível no token filho e no token progenitor.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
