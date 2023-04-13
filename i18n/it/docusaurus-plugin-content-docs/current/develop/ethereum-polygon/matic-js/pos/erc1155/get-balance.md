---
id: get-balance
title: getBalance
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Recupera il saldo del token ERC1155 utilizzando matic.js.'
---

Il metodo `getBalance` può essere utilizzato per recuperare il saldo dell'utente per un token. È disponibile sia sul token figlio che su quello padre.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
