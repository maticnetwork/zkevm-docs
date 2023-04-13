---
id: get-allowance
title: obtenirContribution
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Obtenez le montant approuvé pour l'utilisateur."
---

`getAllowance` la méthode peut être utilisée afin d'obtenir le montant approuvé pour l'utilisateur.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

L'adresse sur laquelle l'approbation est donnée est appelée `spenderAddress`. C'est un utilisateur tiers ou un contrat intelligent qui peut transférer votre jeton en votre nom.

Par défaut, la valeur de spenderAddress est l'adresse de prédicat du jeton erc20.

Vous pouvez spécifier manuellement la valeur de l'adresse du dépensier.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
