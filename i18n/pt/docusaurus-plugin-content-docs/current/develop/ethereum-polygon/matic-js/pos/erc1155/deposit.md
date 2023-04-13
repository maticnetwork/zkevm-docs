---
id: deposit
title: depositar
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Depositar token ERC-1155 usando matic.js'
---

Pode ser usado o método `deposit` para depositar o valor necessário de um token da Ethereum na chain da Polygon.

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

O fornecimento de **dados** é opcional.