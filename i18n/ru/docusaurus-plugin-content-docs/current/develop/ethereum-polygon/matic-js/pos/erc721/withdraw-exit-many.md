---
id: withdraw-exit-many
title: withdrawExitMany
keywords:
- 'pos client, erc721, withdrawExitMany, polygon, sdk'
description: 'Выйдите из процесса вывода с помощью txHash из `withdrawStartMany`'
---

Метод `withdrawExitMany` можно использовать для выхода из процесса вывода с помощью txHash из метода `withdrawStartMany`.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
