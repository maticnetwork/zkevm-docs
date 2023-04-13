---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Matic.js kullanarak ERC1155 token''larını çoklu yatırma'
---

`depositMany` metodu, birden çok token'ın gereken miktarlarını ethereum'dan polygon zincirine yatırmak için kullanılabilir.

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

**Veri** sunumu isteğe bağlıdır.