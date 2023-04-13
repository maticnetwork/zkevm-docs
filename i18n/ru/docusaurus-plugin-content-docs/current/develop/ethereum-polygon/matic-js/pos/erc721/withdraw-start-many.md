---
id: withdraw-start-many
title: withdrawStartMany
keywords:
- 'pos client, erc721, withdrawStartMany, polygon, sdk'
description: 'Инициируйте процесс вывода.'
---

Метод `withdrawStartMany` можно использовать для инициирования процесса вывода, который сжигает множественные токены в polygon chain.

```
const erc721Token = posClient.erc721(<child token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
