---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Obter saldo de token ERC-1155 usando matic.js.'
---

Pode ser usado o método `getBalance` para obter o saldo de um token do utilizador. Este está disponível no token filho e no token pai.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
