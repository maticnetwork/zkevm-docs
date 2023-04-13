---
id: approve
title: approuvez
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Approuvez la quantité requise sur le jeton root."
---

`approve`la méthode  peut être utilisée pour approuver le montant requis sur le jeton root.

l'approbation est requise pour déposer un montant sur la chaîne Polygone.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

L'adresse sur laquelle l'approbation est donnée est appelée `spenderAddress`. C'est un utilisateur tiers ou un contrat intelligent qui peut transférer votre jeton en votre nom.

Par défaut, la valeur de spenderAddress est l'adresse de prédicat du jeton erc20.

Vous pouvez spécifier manuellement la valeur de l'adresse du dépensier.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
