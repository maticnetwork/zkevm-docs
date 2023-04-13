---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Approuvez la quantité maximum sur le jeton root.'
---

`approveMax`la méthode  peut être utilisée pour approuver le montant maximum sur le jeton root.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

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
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
