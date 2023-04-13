---
id: deposit
title: deposit
keywords:
- 'pos client, erc1155, deposit, polygon, sdk'
description: 'Внесите в качестве депозита токен ERC1155 с помощью matic.js'
---

Метод `deposit` можно использовать для внесения в качестве депозита требуемого количества токена из ethereum в polygon chain.

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

Предоставление **данных** является необязательным.