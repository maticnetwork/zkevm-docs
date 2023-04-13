---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Depósito múltiple de tokens ERC-1155 al utilizar matic.js'
---

El método `depositMany` puede utilizarse para depositar cantidades requeridas de múltiples tokens de Ethereum a la cadena de Polygon.

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

Proporcionar **datos** es opcional.