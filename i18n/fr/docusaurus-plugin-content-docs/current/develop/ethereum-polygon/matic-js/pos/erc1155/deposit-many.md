---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Dépôt multiple de jetons ERC1155 en utilisant matic.js'
---

`depositMany` la méthode peut être utilisée pour déposer les quantités requises de plusieurs jetons de la chaîne ethereum à polygone.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.depositMany({
    amount: [1,2],
    tokenId: ['123','456'],
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Fournir des **données** est facultatif.