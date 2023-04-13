---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Penyetoran banyak token ERC1155 menggunakan matic.js'
---

Metode `depositMany` dapat digunakan untuk menyetor jumlah dari banyak token yang diperlukan dari ethereum ke rantai polygon.

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

Memberikan **data** bersifat opsional.