---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Mehrere Einzahlungen von ERC1155 Token mit Hilfe von matic.js'
---

Die `depositMany`-Methode kann verwendet werden, um die erforderlichen Mengen an mehreren Token von Ethereum auf die Polygon-Chain einzuzahlen.

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

Liefern von **data** ist optional.