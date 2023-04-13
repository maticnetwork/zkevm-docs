---
id: deposit
title: deposit (Depositar)
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Deposita el token ERC-1155 con matic.js'
---

El método `deposit` puede utilizarse para depositar la cantidad requerida de un token de Ethereum a la cadena de Polygon.

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

El suministro de **datos** es opcional.