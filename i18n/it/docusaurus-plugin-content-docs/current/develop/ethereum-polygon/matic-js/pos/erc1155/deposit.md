---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Deposita il token ERC1155 utilizzando matic.js.'
---

Il metodo `deposit` può essere utilizzato per depositare la quantità richiesta di un token da ethereum alla catena di polygon.

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

Fornire i **dati** è facoltativo.