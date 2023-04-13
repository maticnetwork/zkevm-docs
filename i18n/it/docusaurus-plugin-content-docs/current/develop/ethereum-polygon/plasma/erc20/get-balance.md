---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Muovere i primi passi con maticjs'
---

# getBalance {#getbalance}

`getBalance` può essere utilizzato per ottenere il saldo dell'utente. È disponibile sia sul token figlio che su quello genitore.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
