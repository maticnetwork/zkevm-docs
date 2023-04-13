---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Einen Saldo von ERC1155 Token mit Hilfe von matic.js abrufen.'
---

Die `getBalance`-Methode kann verwendet werden, um den Benutzersaldo für einen Token zu erhalten. Sie ist sowohl für Child- als auch Parent-Token verfügbar.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
