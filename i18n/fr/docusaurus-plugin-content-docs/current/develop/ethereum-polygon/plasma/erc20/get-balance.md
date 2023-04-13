---
id: get-balance
title: obtenirSolde
keywords:
- 'pos client, erc20, getBalance, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# obtenirSolde {#getbalance}

`getBalance`méthode peut être utilisée pour obtenir le solde de l'utilisateur. C'est disponible à la fois sur le jeton enfant et le jeton parent.

```
const erc20Token = plasmaClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
