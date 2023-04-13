---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Múltiplos depósitos de tokens ERC-1155 usando matic.js'
---

Pode ser usado o método `depositMany` para depositar os valores necessários de múltiplos tokens da Ethereum na chain da Polygon.

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

O fornecimento de **dados** é opcional.