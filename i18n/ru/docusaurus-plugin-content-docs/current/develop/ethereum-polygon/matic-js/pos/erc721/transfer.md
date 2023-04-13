---
id: transfer
title: transfer
keywords:
- 'pos client, erc721, transfer, polygon, sdk'
description: 'Выполните трансфер токенов от одного пользователя другому.'
---

Метод `transfer` можно использовать для выполнения трансфера токенов от одного пользователя другому.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
