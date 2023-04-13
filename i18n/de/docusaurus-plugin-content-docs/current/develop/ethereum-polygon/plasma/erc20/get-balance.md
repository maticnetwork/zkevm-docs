---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Erste Schritte mit maticjs'
---

# getBalance {#getbalance}

Mit dieser `getBalance`-Methode kann der Benutzersaldo abgerufen werden. Das gilt für Child- und Parent-Token.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
