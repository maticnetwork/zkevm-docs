---
id: deposit
title: déposer
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Déposer un jeton ERC1155 en utilisant matic.js'
---

`deposit` la méthode peut être utilisée pour déposer la quantité requise d'un jeton de la chaîne ethereum à polygone.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.deposit({
    amount: 1,
    tokenId: '123',
    userAddress: <from address>,
    data: '0x5465737445524331313535', // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

La fourniture de **données** est facultative.