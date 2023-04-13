---
id: transfer
title: transfer
keywords:
- 'pos client, erc1155, transfer, polygon, sdk'
description: 'Выполните трансфер токенов от одного пользователя другому.'
---

Метод `transfer` можно использовать для выполнения трансфера токенов от одного пользователя другому.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.transfer({
    tokenId: <tokenId>,
    amount: <amount>,
    from : <from address>,
    to : <to address>,
    data : <data to sent>, // data is optional
});

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
