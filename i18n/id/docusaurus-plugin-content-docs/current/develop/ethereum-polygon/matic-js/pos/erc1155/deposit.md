---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Menyetor token ERC1155 menggunakan matic.js'
---

Metode `deposit` dapat digunakan untuk menyetor jumlah token yang diperlukan dari ethereum ke rantai polygon.

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

Memberikan **data** bersifat opsional.