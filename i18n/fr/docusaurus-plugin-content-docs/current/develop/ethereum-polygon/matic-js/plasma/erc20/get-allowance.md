---
id: get-allowance
title: obtenirContribution
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Obtenez le montant approuvé pour l''utilisateur.'
---

 `getAllowance`La méthode peut être utilisée pour obtenir le montant approuvé pour l'utilisateur.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
