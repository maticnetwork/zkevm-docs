---
id: deposit
title: déposez
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Déposez le montant requis du jeton root au jeton enfant.'
---

`deposit`la méthode peut être utilisée pour déposer le montant requis du jeton root au jeton enfant.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Cela pourrait prendre un peu de temps pour refléter le montant déposé sur la chaîne de Polygone. Vous pouvez utiliser la méthode [isDeposited](/docs/develop/ethereum-polygon/matic-js/pos/is-deposited) pour vérifier l'état.
