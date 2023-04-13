---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc1155, withdrawExitMany, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из withdrawStart.'
---

Метод `withdrawExitMany` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStartMany`.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
