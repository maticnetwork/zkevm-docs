---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'ERC1155 Token mit Hilfe von matic.js einzahlen'
---

Die `deposit`-Methode kann verwendet werden, um die erforderliche Menge an Token von Ethereum auf die Polygon-Chain einzuzahlen.

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

Liefern von **data** ist optional.