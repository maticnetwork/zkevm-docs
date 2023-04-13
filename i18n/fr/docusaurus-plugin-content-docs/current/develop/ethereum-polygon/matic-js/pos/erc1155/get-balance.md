---
id: get-balance
title: obtenirSolde
keywords:
- 'pos client, erc1155, getBalance, polygon, sdk'
description: 'Obtenez le solde de jeton ERC1155 en utilisant matic.js.'
---

`getBalance` la méthode peut être utilisée pour obtenir le solde d'utilisateur pour un jeton. C'est disponible à la fois sur le jeton enfant et le jeton parent.

```
const erc1155Token = posClient.erc1155(<token address>);

// get balance of user
const balance = await erc1155Token.getBalance(<userAddress>, <token id>);
```
