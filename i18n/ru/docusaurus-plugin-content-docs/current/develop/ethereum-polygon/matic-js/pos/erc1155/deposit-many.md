---
id: deposit-many
title: depositMany
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Множественный депозит токенов ERC1155 с помощью matic.js'
---

Метод `depositMany` можно использовать для внесения требуемых количеств множественных токенов из ethereum в polygon chain.

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

Предоставление **данных** является необязательным.